import { Router } from 'express';
import { adminController } from '../controllers/admin.controller';
import { authMiddleware, roleMiddleware } from '../middlewares/auth.middleware';
import { auditMiddleware } from '../middlewares/audit.middleware';

const router = Router();

router.use(authMiddleware);
router.use(roleMiddleware('ADMIN'));

router.get('/stats', auditMiddleware('READ', 'admin_stats'), (req, res) =>
  adminController.getStats(req, res)
);

router.get('/audit-logs', auditMiddleware('READ', 'audit_logs'), (req, res) =>
  adminController.getAuditLogs(req, res)
);

router.get('/users', auditMiddleware('READ', 'users'), (req, res) =>
  adminController.getUsers(req, res)
);

export default router;
