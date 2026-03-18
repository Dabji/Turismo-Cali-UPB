import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import { logger } from '../services/logger.service';

export interface JwtPayload {
  userId: number;
  username: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Token de autenticación requerido' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    logger.warn(`Token inválido desde IP: ${req.ip}`);
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

export function roleMiddleware(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'No autenticado' });
      return;
    }

    if (!roles.includes(req.user.role)) {
      logger.warn(`Acceso denegado: ${req.user.username} intentó acceder a recurso restringido (rol: ${req.user.role})`);
      res.status(403).json({ error: 'No tienes permisos para esta acción' });
      return;
    }

    next();
  };
}
