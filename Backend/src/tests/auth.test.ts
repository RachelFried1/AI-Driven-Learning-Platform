import request from 'supertest';
import app from '../app';
import prisma from '../shared/config/prisma';
import bcrypt from 'bcryptjs';
import { Role } from '@prisma/client';

let userToken: string;
let adminToken: string;

beforeEach(async () => {
  await prisma.prompt.deleteMany();
  await prisma.user.deleteMany();

  // Create normal user with a unique email and phone
  await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Normal User',
      email: 'user_unique@example.com',
      phone: '1234567894',
      password: 'password123'
    });
  const userLogin = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'user_unique@example.com',
      password: 'password123'
    });
  userToken = userLogin.body.token;
  console.log('Setup userToken:', userToken); // Debug output

  // Create admin user directly in DB with a unique email and phone
  const hashedPassword = await bcrypt.hash('adminpass', 10);
  await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin_unique@example.com',
      phone: '1234567896', // <-- Make sure this is unique!
      password: hashedPassword,
      role: Role.admin,
    }
  });
  const adminLogin = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'admin_unique@example.com',
      password: 'adminpass'
    });
  adminToken = adminLogin.body.token;
  console.log('Setup adminToken:', adminToken); // Debug output
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Admin Routes', () => {
  it('should prevent non-admin from accessing /admin/users', async () => {
    const res = await request(app)
      .get('/api/admin/users')
      .set('Authorization', `Bearer ${userToken}`);
    console.log('Non-admin access response:', res.body, res.status); // Debug output
    expect(res.status).toBe(403);
  });

  it('should allow admin to view all users', async () => {
    const res = await request(app)
      .get('/api/admin/users')
      .set('Authorization', `Bearer ${adminToken}`);
    console.log('Admin access response:', res.body, res.status); // Debug output
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});