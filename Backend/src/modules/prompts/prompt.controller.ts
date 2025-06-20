import { Request, Response } from 'express';
import * as promptService from './prompt.service';
import { AuthRequest } from '../../shared/middlewares/auth';
import prisma from '../../shared/config/prisma';
import { generateLesson } from '../../shared/services/openAIService';

// Create a new prompt (with OpenAI integration)
export async function createPrompt(req: AuthRequest, res: Response): Promise<void> {
  const userId = req.user?.userId;
  const { categoryId, subCategoryId, prompt } = req.body;
  if (!userId || !categoryId || !subCategoryId || !prompt || prompt.length > 10000) {
    res.status(400).json({ message: 'All fields are required and prompt must be <= 10000 chars.' });
    return;
  }

  // Fetch category and subcategory names from DB
  const category = await prisma.category.findUnique({ where: { id: Number(categoryId) } });
  const subCategory = await prisma.subCategory.findUnique({ where: { id: Number(subCategoryId) } });

  if (!category || !subCategory) {
    res.status(400).json({ message: 'Invalid category or subcategory.' });
    return;
  }

  // Generate lesson using OpenAI
  const lesson = await generateLesson(prompt, category.name, subCategory.name);

  // Save prompt and response to DB
  const newPrompt = await promptService.createPrompt(
    userId,
    Number(categoryId),
    Number(subCategoryId),
    prompt,
    lesson
  );
  res.status(201).json(newPrompt);
}

// Get all prompts for the authenticated user WITH pagination and filtering
export async function getUserPrompts(req: AuthRequest, res: Response): Promise<void> {
  const userId = req.user?.userId;
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  // Pagination
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.max(Number(req.query.limit) || 10, 1);
  const skip = (page - 1) * limit;

  // Filters
  const { categoryId, subCategoryId, search, date } = req.query;

  const where: any = { userId };

  if (categoryId) where.categoryId = Number(categoryId);
  if (subCategoryId) where.subCategoryId = Number(subCategoryId);

  if (date) {
    // Filter for a specific day
    const start = new Date(date as string);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);
    where.createdAt = { gte: start, lt: end };
  }

  if (search) {
    where.OR = [
      { prompt: { contains: String(search), mode: 'insensitive' } },
      { response: { contains: String(search), mode: 'insensitive' } },
    ];
  }

  const totalItems = await prisma.prompt.count({ where });

  const items = await prisma.prompt.findMany({
    where,
    skip,
    take: limit,
    orderBy: { createdAt: 'desc' },
    include: { category: true, subCategory: true },
  });

  const totalPages = Math.ceil(totalItems / limit);

  res.json({
    items,
    page,
    totalItems,
    totalPages,
  });
}

// Admin-only: List all prompts with pagination and filtering, including user info
export const getAllPrompts = [
  async (req: Request, res: Response) => {
    try {
      // Pagination
      const page = Math.max(Number(req.query.page) || 1, 1);
      const limit = Math.max(Number(req.query.limit) || 10, 1);
      const skip = (page - 1) * limit;

      // Filters
      const {
        userId,
        categoryId,
        subCategoryId,
        search,
        startDate,
        endDate,
      } = req.query;

      // Build where clause dynamically
      const where: any = {};

      if (userId) where.userId = Number(userId);
      if (categoryId) where.categoryId = Number(categoryId);
      if (subCategoryId) where.subCategoryId = Number(subCategoryId);

      if (search) {
        where.OR = [
          { prompt: { contains: String(search), mode: 'insensitive' } },
          { response: { contains: String(search), mode: 'insensitive' } },
          { user: { name: { contains: String(search), mode: 'insensitive' } } },
        ];
      }

      if (startDate || endDate) {
        where.createdAt = {};
        if (startDate) where.createdAt.gte = new Date(String(startDate));
        if (endDate) where.createdAt.lte = new Date(String(endDate));
      }

      // Get total count for pagination
      const totalItems = await prisma.prompt.count({ where });

      // Fetch paginated prompts, including user info
      const data = await prisma.prompt.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { id: true, name: true, email: true, role: true } },
          category: true,
          subCategory: true,
        },
      });

      const totalPages = Math.ceil(totalItems / limit);

      res.json({
        items: data,
        page,
        totalItems,
        totalPages,
      });
    } catch (err: any) {
      res.status(400).json({ message: 'Invalid query or database error.', error: err.message });
    }
  },
];