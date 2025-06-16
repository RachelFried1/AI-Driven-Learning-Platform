import prisma from '../../shared/config/prisma';

export async function createCategory(name: string) {
  return prisma.category.create({ data: { name } });
}

export async function getAllCategories() {
  return prisma.category.findMany();
}