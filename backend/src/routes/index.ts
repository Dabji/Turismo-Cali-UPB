import { Router } from 'express';
import authRoutes from './auth.routes';
import tourismRoutes from './tourism.routes';
import contactRoutes from './contact.routes';
import adminRoutes from './admin.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/tourism', tourismRoutes);
router.use('/contact', contactRoutes);
router.use('/admin', adminRoutes);

// Health check
router.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;
