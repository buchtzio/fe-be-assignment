import { Router } from 'express';
import { login, getUserInfo } from '../controllers/authController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.post('/login', login);
router.get('/user-info', authenticateToken, getUserInfo);

export default router;
