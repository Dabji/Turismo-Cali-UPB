import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/login', (req, res) => authController.login(req, res));
router.get('/me', authMiddleware, (req, res) => authController.me(req, res));

export default router;
