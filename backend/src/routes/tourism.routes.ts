import { Router } from 'express';
import { tourismController } from '../controllers/tourism.controller';
import { authMiddleware, roleMiddleware } from '../middlewares/auth.middleware';
import { auditMiddleware } from '../middlewares/audit.middleware';

const router = Router();

// Rutas públicas
router.get('/services', (req, res) => tourismController.getServices(req, res));
router.get('/services/:id', (req, res) => tourismController.getServiceById(req, res));

// Rutas protegidas (solo ADMIN/EDITOR)
router.post(
  '/services',
  authMiddleware,
  roleMiddleware('ADMIN', 'EDITOR'),
  auditMiddleware('CREATE', 'tour_service'),
  (req, res) => tourismController.createService(req, res)
);

router.put(
  '/services/:id',
  authMiddleware,
  roleMiddleware('ADMIN', 'EDITOR'),
  auditMiddleware('UPDATE', 'tour_service'),
  (req, res) => tourismController.updateService(req, res)
);

router.delete(
  '/services/:id',
  authMiddleware,
  roleMiddleware('ADMIN'),
  auditMiddleware('DELETE', 'tour_service'),
  (req, res) => tourismController.deleteService(req, res)
);

export default router;
