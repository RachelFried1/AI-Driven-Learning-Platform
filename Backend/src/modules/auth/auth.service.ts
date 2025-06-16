import prisma from '../../shared/config/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, Role } from '@prisma/client';

export async function registerUser(
  name: string,
  email: string,
  phone: string,
  password: string
): Promise<User> {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: {
      name,
      email,
      phone,
      password: hashedPassword,
      role: Role.user, // Use the Role enum
    },
  });
}

export async function validateUser(email: string, password: string): Promise<User | null> {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;
  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? user : null;
}

export function generateJWT(user: User): string {
  return jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: '7d' }
  );
}