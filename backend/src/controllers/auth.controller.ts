import { Request, Response } from 'express';
import jwt, { type SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from '../config/env';
import prisma from '../config/database';
import { ldapService } from '../services/ldap.service';
import { logger, logAudit } from '../services/logger.service';
import { JwtPayload } from '../middlewares/auth.middleware';

export class AuthController {
  /**
   * POST /api/auth/login
   * Intenta autenticar primero con LDAP; si falla, usa la BD local.
   */
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        res.status(400).json({ error: 'Usuario y contraseña son requeridos' });
        return;
      }

      const ip = req.ip || req.socket.remoteAddress || 'unknown';

      // 1. Intentar autenticación LDAP
      const ldapUser = await ldapService.authenticate(username, password);

      if (ldapUser) {
        // Buscar o crear usuario en BD local
        let user = await prisma.user.findUnique({ where: { username } });

        if (!user) {
          user = await prisma.user.create({
            data: {
              username: ldapUser.username,
              email: ldapUser.email,
              firstName: ldapUser.firstName,
              lastName: ldapUser.lastName,
              isLdap: true,
              role: 'USER',
            },
          });
        }

        const token = this.generateToken(user);

        logAudit({
          userId: user.id,
          username: user.username,
          action: 'LOGIN_LDAP',
          resource: '/api/auth/login',
          detail: 'Autenticación exitosa vía LDAP',
          ipAddress: ip,
          userAgent: req.headers['user-agent'],
        });

        res.json({
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
          },
        });
        return;
      }

      // 2. Fallback: autenticación local con BD
      const user = await prisma.user.findUnique({ where: { username } });

      if (!user || !user.password) {
        logger.warn(`Intento de login fallido para: ${username} desde IP: ${ip}`);
        res.status(401).json({ error: 'Credenciales inválidas' });
        return;
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        logger.warn(`Contraseña incorrecta para: ${username} desde IP: ${ip}`);
        res.status(401).json({ error: 'Credenciales inválidas' });
        return;
      }

      if (!user.isActive) {
        res.status(403).json({ error: 'Cuenta desactivada' });
        return;
      }

      const token = this.generateToken(user);

      logAudit({
        userId: user.id,
        username: user.username,
        action: 'LOGIN_LOCAL',
        resource: '/api/auth/login',
        detail: 'Autenticación exitosa vía BD local',
        ipAddress: ip,
        userAgent: req.headers['user-agent'],
      });

      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
      });
    } catch (error) {
      logger.error('Error en login:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  /**
   * GET /api/auth/me
   * Retorna los datos del usuario autenticado.
   */
  async me(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'No autenticado' });
        return;
      }

      const user = await prisma.user.findUnique({
        where: { id: req.user.userId },
        select: {
          id: true,
          username: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          isLdap: true,
          createdAt: true,
        },
      });

      if (!user) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
      }

      res.json({ user });
    } catch (error) {
      logger.error('Error en /me:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  private generateToken(user: { id: number; username: string; email: string; role: string }): string {
    const payload: JwtPayload = {
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const secret = config.jwt.secret;
    if (!secret) {
      throw new Error('JWT secret is not configured');
    }

    const options: SignOptions = {
      expiresIn: config.jwt.expiresIn as SignOptions['expiresIn'],
    };

    return jwt.sign(payload, secret, options);
  }
}

export const authController = new AuthController();
