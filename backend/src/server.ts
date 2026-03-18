import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { config } from './config/env';
import { connectDatabase } from './config/database';
import { logger } from './services/logger.service';
import { requestLogger } from './middlewares/audit.middleware';
import routes from './routes';

const app = express();

// ==========================================
// MIDDLEWARES DE SEGURIDAD Y RENDIMIENTO
// ==========================================
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: config.cors.origin,
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting para optimizar respuesta < 6 segundos
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,
  message: { error: 'Demasiadas solicitudes, intente más tarde' },
});
app.use(limiter);

// Logging HTTP con Morgan → Winston
app.use(morgan('combined', {
  stream: {
    write: (message: string) => logger.info(message.trim()),
  },
}));

// Middleware de registro de tiempo de respuesta
app.use(requestLogger);

// Trust proxy (para obtener IP real detrás de Nginx)
app.set('trust proxy', 1);

// ==========================================
// RUTAS
// ==========================================
app.use(config.apiPrefix, routes);

// Ruta raíz
app.get('/', (_req, res) => {
  res.json({
    name: 'API Turismo Cali',
    version: '1.0.0',
    status: 'running',
    documentation: `${config.apiPrefix}/health`,
  });
});

// ==========================================
// MANEJO DE ERRORES GLOBAL
// ==========================================
app.use((_req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error('Error no controlado:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// ==========================================
// INICIO DEL SERVIDOR
// ==========================================
async function startServer() {
  try {
    await connectDatabase();

    app.listen(config.port, () => {
      logger.info(`🚀 Servidor corriendo en http://localhost:${config.port}`);
      logger.info(`📝 API disponible en http://localhost:${config.port}${config.apiPrefix}`);
      logger.info(`🔧 Entorno: ${config.nodeEnv}`);
    });
  } catch (error) {
    logger.error('Error fatal al iniciar el servidor:', error);
    process.exit(1);
  }
}

startServer();

export default app;
