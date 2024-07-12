import jwt from 'jsonwebtoken';
import config from 'config';

interface JwtPayload {
  id: string;
  username: string;
  role: string;
  iat?: number; 
  exp?: number;
}
const JWT_SECRET: string = config.get('JWT_SECRET');

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (error) {
    return null;
  }
};
