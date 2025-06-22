import request from 'supertest';
import app from '../app';
import prisma from '../shared/config/prisma';

let userToken: string;

beforeEach(async () => {
  await prisma.prompt.deleteMany();
  await prisma.user.deleteMany();

  // Register and login a user with unique email and phone
  await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Test User',
      email: 'user_test_unique@example.com',
      phone: '1234567897', // <-- Make sure this is unique!
      password: 'password123'
    });

  const loginRes = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'user_test_unique@example.com',
      password: 'password123'
    });

  userToken = loginRes.body.token;
  console.log('Setup userToken:', userToken); // Debug output
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Users Routes', () => {
  it('should get current user profile', async () => {
    const res = await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${userToken}`);
    console.log('Get profile response:', res.body); // Debug output
    expect(res.status).toBe(200);
    expect(res.body.email).toBe('user_test_unique@example.com');
  });

  it('should update current user profile', async () => {
    console.log('User token for update:', userToken); // Debug output
    const res = await request(app)
      .put('/api/users/me')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ name: 'Updated Name', phone: '1112223333' });
    console.log('Update response:', res.body); // Debug output
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Updated Name');
    expect(res.body.phone).toBe('1112223333');
  });

  it('should not get profile without auth', async () => {
    const res = await request(app)
      .get('/api/users/me');
    expect(res.status).toBe(401);
  });
});