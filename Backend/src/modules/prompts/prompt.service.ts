import prisma from '../../shared/config/prisma';

// Create a new prompt and save it to the database
export async function createPrompt(
  userId: number,
  categoryId: number,
  subCategoryId: number,
  prompt: string,
  response: string
) {
  return prisma.prompt.create({
    data: {
      userId,
      categoryId,
      subCategoryId,
      prompt,
      response,
    },
  });
}

// Get all prompts for a specific user
export async function getUserPrompts(userId: number) {
  return prisma.prompt.findMany({
    where: { userId },
    include: {
      category: true,
      subCategory: true,
    },
    orderBy: { createdAt: 'desc' },
  });
}

// (Optional) Admin: List all prompts with related data
export async function listAllPrompts() {
  return prisma.prompt.findMany({
    include: {
      user: true,
      category: true,
      subCategory: true,
    },
    orderBy: { createdAt: 'desc' },
  });
}