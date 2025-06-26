import prisma from '../../shared/config/prisma';

export async function listAllUsers() {
  return prisma.user.findMany({
    where: {
      role: { not: 'admin' }, 
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      prompts: true,
    },
  });
}

export async function getUserPrompts(userId: number) {
  return prisma.prompt.findMany({
    where: { userId },
    include: {
      category: true,
      subCategory: true,
    },
  });
}