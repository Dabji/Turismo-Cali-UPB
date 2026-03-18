import { Request, Response } from 'express';
import prisma from '../config/database';
import { logger } from '../services/logger.service';

export class AdminController {
  /**
   * GET /api/admin/stats
   */
  async getStats(req: Request, res: Response): Promise<void> {
    try {
      const [totalUsers, totalServices, totalMessages, unreadMessages, recentLogs] =
        await Promise.all([
          prisma.user.count(),
          prisma.tourService.count({ where: { isActive: true } }),
          prisma.contactMessage.count(),
          prisma.contactMessage.count({ where: { isRead: false } }),
          prisma.auditLog.findMany({
            orderBy: { timestamp: 'desc' },
            take: 20,
            select: {
              id: true,
              username: true,
              action: true,
              resource: true,
              ipAddress: true,
              timestamp: true,
            },
          }),
        ]);

      res.json({
        stats: { totalUsers, totalServices, totalMessages, unreadMessages },
        recentLogs,
      });
    } catch (error) {
      logger.error('Error obteniendo estadísticas:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  /**
   * GET /api/admin/audit-logs
   */
  async getAuditLogs(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 50;
      const skip = (page - 1) * limit;

      const [logs, total] = await Promise.all([
        prisma.auditLog.findMany({
          orderBy: { timestamp: 'desc' },
          skip,
          take: limit,
        }),
        prisma.auditLog.count(),
      ]);

      res.json({ logs, total, page, totalPages: Math.ceil(total / limit) });
    } catch (error) {
      logger.error('Error obteniendo logs de auditoría:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  /**
   * GET /api/admin/users
   */
  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          username: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          isLdap: true,
          isActive: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      });

      res.json({ users });
    } catch (error) {
      logger.error('Error obteniendo usuarios:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}

export const adminController = new AdminController();
