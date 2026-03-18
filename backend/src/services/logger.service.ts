import winston from 'winston';
import path from 'path';
import { config } from '../config/env';
import fs from 'fs';

const logDir = config.log.dir;
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : '';
    return `[${timestamp}] ${level.toUpperCase()}: ${message} ${metaStr}`;
  })
);

export const logger = winston.createLogger({
  level: config.log.level,
  format: logFormat,
  defaultMeta: { service: 'turismo-cali-api' },
  transports: [
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'audit.log'),
      level: 'info',
      maxsize: 10485760, // 10MB
      maxFiles: 10,
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'combined.log'),
      maxsize: 10485760,
      maxFiles: 5,
    }),
  ],
});

if (config.isDev()) {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

export interface AuditEntry {
  userId: number;
  username: string;
  action: string;
  resource: string;
  detail?: string;
  ipAddress: string;
  userAgent?: string;
}

export function logAudit(entry: AuditEntry): void {
  logger.info(`AUDIT | Usuario: ${entry.username} (ID:${entry.userId}) | Acción: ${entry.action} | Recurso: ${entry.resource} | IP: ${entry.ipAddress}`, {
    audit: true,
    ...entry,
  });
}
