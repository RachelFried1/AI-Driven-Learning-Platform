import prisma from '../../shared/config/prisma';

// Create a new prompt
export async function createPrompt(
  userId: number,
  categoryId: number,
  subCategoryId: number,
  prompt: string,
  lesson: string
) {
  return prisma.prompt.create({
    data: {
      userId,
      categoryId,
      subCategoryId,
      prompt,
      response: lesson,
    },
    include: {
      category: true,
      subCategory: true,
    },
  });
}

// Get all prompts for a user with pagination and filtering
export async function getUserPrompts(params: {
  userId: number;
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: number;
  subCategoryId?: number;
  startDate?: string;
  endDate?: string;
}) {
  const {
    userId,
    page = 1,
    limit = 10,
    search,
    categoryId,
    subCategoryId,
    startDate,
    endDate,
  } = params;

  const skip = (page - 1) * limit;
  const where: any = { userId };

  if (categoryId) where.categoryId = categoryId;
  if (subCategoryId) where.subCategoryId = subCategoryId;
  if (search) {
    where.OR = [
      { prompt: { contains: search, mode: 'insensitive' } },
      { response: { contains: search, mode: 'insensitive' } },
    ];
  }
  if (startDate || endDate) {
    where.createdAt = {};
    if (startDate) where.createdAt.gte = new Date(startDate);
    if (endDate) where.createdAt.lte = new Date(endDate);
  }

  const [items, totalItems] = await Promise.all([
    prisma.prompt.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
        subCategory: true,
      },
    }),
    prisma.prompt.count({ where }),
  ]);

  const totalPages = Math.ceil(totalItems / limit);

  return { items, page, totalItems, totalPages };
}

// Admin: Get all prompts with pagination, filtering, and user info
export async function getAllPrompts(params: {
  page?: number;
  limit?: number;
  userId?: number;
  categoryId?: number;
  subCategoryId?: number;
  search?: string;
  startDate?: string;
  endDate?: string;
}) {
  const {
    page = 1,
    limit = 10,
    userId,
    categoryId,
    subCategoryId,
    search,
    startDate,
    endDate,
  } = params;

  const skip = (page - 1) * limit;
  const where: any = {};

  if (userId) where.userId = userId;
  if (categoryId) where.categoryId = categoryId;
  if (subCategoryId) where.subCategoryId = subCategoryId;
  if (search) {
    where.OR = [
      { prompt: { contains: search, mode: 'insensitive' } },
      { response: { contains: search, mode: 'insensitive' } },
      { user: { name: { contains: search, mode: 'insensitive' } } },
    ];
  }
  if (startDate || endDate) {
    where.createdAt = {};
    if (startDate) where.createdAt.gte = new Date(startDate);
    if (endDate) where.createdAt.lte = new Date(endDate);
  }

  const [items, totalItems] = await Promise.all([
    prisma.prompt.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { id: true, name: true, email: true, role: true } },
        category: true,
        subCategory: true,
      },
    }),
    prisma.prompt.count({ where }),
  ]);

  const totalPages = Math.ceil(totalItems / limit);

  return { items, page, totalItems, totalPages };
}