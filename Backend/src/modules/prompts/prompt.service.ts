import prisma from '../../shared/config/prisma';


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


export async function getUserPrompts(params: {
  userId: number;
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: number;
  subCategoryId?: number;
  date?: string;
  tzOffset?: number;
}) {
  const {
    userId,
    page = 1,
    limit = 10,
    search,
    categoryId,
    subCategoryId,
    date,
    tzOffset = 0,
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
  if (date) {
    const start = new Date(`${date}T00:00:00.000Z`);
    start.setUTCMinutes(start.getUTCMinutes() - tzOffset);
    const end = new Date(start);
    end.setUTCDate(end.getUTCDate() + 1);
    console.log('Frontend sent date:', date, 'tzOffset:', tzOffset);
    console.log('Filtering createdAt between:', start.toISOString(), 'and', end.toISOString());
    where.createdAt = { gte: start, lt: end };
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

export async function getAllPrompts(params: {
  page?: number;
  limit?: number;
  userId?: number;
  categoryId?: number;
  subCategoryId?: number;
  search?: string;
  date?: string;
  tzOffset?: number;
}) {
  const {
    page = 1,
    limit = 10,
    userId,
    categoryId,
    subCategoryId,
    search,
    date,
    tzOffset = 0,
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
  if (date) {
    const start = new Date(`${date}T00:00:00.000Z`);
    start.setUTCMinutes(start.getUTCMinutes() - tzOffset);
    const end = new Date(start);
    end.setUTCDate(end.getUTCDate() + 1);
    console.log('Frontend sent date:', date, 'tzOffset:', tzOffset);
    console.log('Filtering createdAt between:', start.toISOString(), 'and', end.toISOString());
    where.createdAt = { gte: start, lt: end };
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