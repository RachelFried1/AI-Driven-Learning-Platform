import prisma from '../../shared/config/prisma';

export async function listAllUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      prompts: true, // You can count or include prompt details here
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