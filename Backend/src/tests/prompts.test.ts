import request from 'supertest';
import app from '../app';
import prisma from '../shared/config/prisma';
import { Role } from '@prisma/client';

let userToken: string;
let adminToken: string;

beforeEach(async () => {
  await prisma.user.deleteMany();

  // Create normal user
  await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Normal User',
      email: 'user@example.com',
      phone: '1234567894',
      password: 'password123'
    });
  const userLogin = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'user@example.com',
      password: 'password123'
    });
  userToken = userLogin.body.token;

  // Create admin user directly in DB
  await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      phone: '1234567895',
      password: 'hashedpassword',
      role: Role.admin,
    }
  });
  const adminLogin = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'admin@example.com',
      password: 'hashedpassword' // If you hash in register, use the same here
    });
  adminToken = adminLogin.body.token;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Admin Routes', () => {
  it('should prevent non-admin from accessing /admin/users', async () => {
    const res = await request(app)
      .get('/api/admin/users')
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.status).toBe(403);
  });

  it('should allow admin to view all users', async () => {
    const res = await request(app)
      .get('/api/admin/users')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});