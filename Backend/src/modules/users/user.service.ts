import prisma from '../../shared/config/prisma';

export async function getUserById(userId: number) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, phone: true, role: true }
  });
}

export async function updateUserById(userId: number, data: { name?: string; phone?: string }) {
  return prisma.user.update({
    where: { id: userId },
    data
  });
}