import { Router } from 'express';
import { getCharacters, serachByName, updateCharacter } from '../controllers/characterController';
import { authenticateToken, authorizeRole } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authenticateToken, getCharacters);
router.get('/search', authenticateToken, serachByName);
router.put('/:id', authenticateToken, authorizeRole(['admin']), updateCharacter);

export default router;
