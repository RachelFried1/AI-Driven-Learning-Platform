import prisma from '../../shared/config/prisma';

export async function createPrompt(
  userId: number,
  categoryId: number,
  subCategoryId: number,
  prompt: string,
  response: string
) {
  return prisma.prompt.create({
    data: { userId, categoryId, subCategoryId, prompt, response }
  });
}

export async function getUserPrompts(userId: number) {
  return prisma.prompt.findMany({ where: { userId } });
}

