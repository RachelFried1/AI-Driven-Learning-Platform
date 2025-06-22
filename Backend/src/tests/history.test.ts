import request from 'supertest';
import app from '../app';
import prisma from '../shared/config/prisma';

let userToken: string;

beforeEach(async () => {
  await prisma.prompt.deleteMany();
  await prisma.user.deleteMany();

  // Register and login user with a unique email
  const registerRes = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'History User',
      email: 'history_unique@example.com',
      phone: '1234567893',
      password: 'password123'
    });
  const loginRes = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'history_unique@example.com',
      password: 'password123'
    });
  userToken = loginRes.body.token;
  console.log('Setup userToken:', userToken); // Debug output
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('History Route', () => {
  it('should fetch personal history (auth required)', async () => {
    const res = await request(app)
      .get('/api/prompts/my')
      .set('Authorization', `Bearer ${userToken}`);
    console.log('History response:', res.body); // Debug output
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.items)).toBe(true); // Check items array
  });
});