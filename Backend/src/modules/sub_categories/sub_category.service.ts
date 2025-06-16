import prisma from '../../shared/config/prisma';

export async function createSubCategory(name: string, categoryId: number) {
  // Enforce unique subcategory name within a category
  const exists = await prisma.subCategory.findFirst({ where: { name, categoryId } });
  if (exists) throw new Error('Subcategory name already exists in this category');
  return prisma.subCategory.create({ data: { name, categoryId } });
}

export async function getSubCategoriesByCategory(categoryId: number) {
  return prisma.subCategory.findMany({ where: { categoryId } });
}