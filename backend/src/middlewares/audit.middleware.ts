import { Request, Response, NextFunction } from 'express';
import prisma from '../config/database';
import { logAudit } from '../services/logger.service';

export function auditMiddleware(action: string, resource: string) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const originalJson = res.json.bind(res);

    res.json = (body: any) => {
      if (req.user && res.statusCode < 400) {
        const auditEntry = {
          userId: req.user.userId,
          username: req.user.username,
          action,
          resource,
          detail: JSON.stringify({
            method: req.method,
            path: req.originalUrl,
            body: req.method !== 'GET' ? req.body : undefined,
          }),
          ipAddress: (req.ip || req.socket.remoteAddress || 'unknown'),
          userAgent: req.headers['user-agent'] || 'unknown',
        };

        logAudit(auditEntry);

        prisma.auditLog.create({ data: auditEntry }).catch((err: Error) => {
          console.error('Error guardando log de auditoría en BD:', err.message);
        });
      }

      return originalJson(body);
    };

    next();
  };
}

export function requestLogger(req: Request, _res: Response, next: NextFunction): void {
  const start = Date.now();
  const originalEnd = _res.end.bind(_res);

  (_res as any).end = function (...args: any[]) {
    const duration = Date.now() - start;
    const user = req.user ? req.user.username : 'anónimo';
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${_res.statusCode} - ${duration}ms - Usuario: ${user} - IP: ${req.ip}`
    );
    return originalEnd(...args);
  };

  next();
}
