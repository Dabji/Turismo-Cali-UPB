import { PrismaClient } from '@prisma/client';
import { config } from './env';
import { logger } from '../services/logger.service';

const prisma = new PrismaClient({
  log: config.isDev()
    ? [
        { level: 'query', emit: 'event' },
        { level: 'error', emit: 'stdout' },
        { level: 'warn', emit: 'stdout' },
      ]
    : [{ level: 'error', emit: 'stdout' }],
});

if (config.isDev()) {
  prisma.$on('query' as never, (e: any) => {
    logger.debug(`Query: ${e.query} | Duration: ${e.duration}ms`);
  });
}

export async function connectDatabase(): Promise<void> {
  try {
    await prisma.$connect();
    logger.info('✅ Conexión a MySQL establecida correctamente');
  } catch (error) {
    logger.error('❌ Error al conectar con MySQL:', error);
    process.exit(1);
  }
}

export async function disconnectDatabase(): Promise<void> {
  await prisma.$disconnect();
  logger.info('🔌 Conexión a MySQL cerrada');
}

export default prisma;
