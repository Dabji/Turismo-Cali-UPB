import { Router } from 'express';
import { contactController } from '../controllers/contact.controller';
import { authMiddleware, roleMiddleware } from '../middlewares/auth.middleware';
import { auditMiddleware } from '../middlewares/audit.middleware';

const router = Router();

// Ruta pública
router.post('/', (req, res) => contactController.create(req, res));

// Rutas protegidas (admin)
router.get(
  '/',
  authMiddleware,
  roleMiddleware('ADMIN'),
  auditMiddleware('READ', 'contact_messages'),
  (req, res) => contactController.getAll(req, res)
);

router.patch(
  '/:id/read',
  authMiddleware,
  roleMiddleware('ADMIN'),
  auditMiddleware('UPDATE', 'contact_message'),
  (req, res) => contactController.markAsRead(req, res)
);

export default router;
