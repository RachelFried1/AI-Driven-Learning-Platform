import request from 'supertest';
import app from '../app';
import prisma from '../shared/config/prisma';

beforeEach(async () => {
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Auth Routes', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        phone: '1234567890',
        password: 'password123'
      });
    expect(res.status).toBe(201);
    expect(res.body.email).toBe('test@example.com');
  });

  it('should not register an existing user', async () => {
    await prisma.user.create({
      data: {
        name: 'Test User',
        email: 'test@example.com',
        phone: '1234567890',
        password: 'hashedpassword',
      }
    });
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        phone: '1234567890',
        password: 'password123'
      });
    expect(res.status).toBe(409);
  });

  it('should log in with correct credentials and receive JWT', async () => {
    // Register first
    await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test2@example.com',
        phone: '1234567891',
        password: 'password123'
      });
    // Login
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test2@example.com',
        password: 'password123'
      });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});