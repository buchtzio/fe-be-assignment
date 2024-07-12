import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';
import { findUserByUsername, createMockUsers } from '../models/userModel';

export const authenticateUser = async (username: string, password: string): Promise<{ token: string } | null> => {
  const user = findUserByUsername(username);
  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return null;
  }

  const token = generateToken({ id: user.id, username: user.username, role: user.role });

  return { token };
};

createMockUsers();

