import request from 'supertest';
import app from '../src/app';
import { authenticateUser } from '../src/services/authService';
import { createMockUsers } from '../src/models/userModel';
import { generateToken } from '../src/utils/jwt';

describe('Authentication Tests', () => {
  let token: string;

  beforeAll(async () => {
    await createMockUsers();
    token = generateToken({ id: '1', username: 'admin', role: 'admin' });
  });

  describe('AuthService', () => {
    it('should authenticate user with correct credentials', async () => {
      const token = await authenticateUser('admin', 'adminPass');
      expect(token).not.toBeNull();
    });

    it('should not authenticate user with incorrect credentials', async () => {
      const token = await authenticateUser('admin', 'wrongpassword');
      expect(token).toBeNull();
    });
  });

  describe('AuthController', () => {
    it('should authenticate user with correct credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ username: 'admin', password: 'adminPass' });

      expect(res.statusCode).toEqual(200);
      expect(res.body.token).toBeDefined();
    });

    it('should not authenticate user with incorrect credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ username: 'admin', password: 'wrongpassword' });

      expect(res.statusCode).toEqual(401);
    });

    it('should get user info with valid token', async () => {
      const res = await request(app)
        .get('/api/auth/user-info')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toMatchObject({
        id: '1',
        username: 'admin',
        role: 'admin'
      });
    });

    it('should not get user info with invalid token', async () => {
      const res = await request(app)
        .get('/api/auth/user-info')
        .set('Authorization', 'Bearer invalidtoken');

      expect(res.statusCode).toEqual(403);
    });
  });
});
