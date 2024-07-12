import request from 'supertest';
import app from '../src/app';
import { generateToken } from '../src/utils/jwt';

describe('CharacterController', () => {
  let token: string;

  beforeAll(() => {
    token = generateToken({ id: '1', username: 'admin', role: 'admin' });
  });

  it('should get all characters', async () => {
    const start = Date.now();
    const res = await request(app)
      .get('/api/characters')
      .set('Authorization', `Bearer ${token}`);
    const duration = Date.now() - start;
    console.log(`GET /api/characters took ${duration}ms`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should search characters by name', async () => {
    const start = Date.now();
    const res = await request(app)
      .get('/api/characters/search?name=Rick')
      .set('Authorization', `Bearer ${token}`);
    const duration = Date.now() - start;
    console.log(`GET /api/characters/search?name=Rick took ${duration}ms`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should update a character', async () => {
    const start = Date.now();
    const res = await request(app)
      .put('/api/characters/1')
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'Dead' });
    const duration = Date.now() - start;
    console.log(`PUT /api/characters/1 took ${duration}ms`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Character updated');
  });
});
