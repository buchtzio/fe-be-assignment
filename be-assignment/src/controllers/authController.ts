import { Request, Response } from 'express';
import { authenticateUser } from '../services/authService';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const token = await authenticateUser(username, password);
    if (!token) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json(token);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getUserInfo = (req: AuthenticatedRequest, res: Response) => {
  const user = req.user;
  res.json(user);
};

