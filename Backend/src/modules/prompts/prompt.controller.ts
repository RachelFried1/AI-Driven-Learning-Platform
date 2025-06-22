import { Request, Response } from 'express';
import * as promptService from './prompt.service';
import { AuthRequest } from '../../shared/middlewares/auth';
import prisma from '../../shared/config/prisma';
import { generateLesson } from '../../shared/services/openAIService';


export async function createPrompt(req: AuthRequest, res: Response): Promise<void> {
  const userId = req.user?.userId;
  const { categoryId, subCategoryId, prompt } = req.body;
  if (!userId || !categoryId || !subCategoryId || !prompt || prompt.length > 10000) {
    res.status(400).json({ message: 'All fields are required and prompt must be <= 10000 chars.' });
    return;
  }


  const category = await prisma.category.findUnique({ where: { id: Number(categoryId) } });
  const subCategory = await prisma.subCategory.findUnique({ where: { id: Number(subCategoryId) } });

  if (!category || !subCategory) {
    res.status(400).json({ message: 'Invalid category or subcategory.' });
    return;
  }

  const lesson = await generateLesson(prompt, category.name, subCategory.name);

  const newPrompt = await promptService.createPrompt(
    userId,
    Number(categoryId),
    Number(subCategoryId),
    prompt,
    lesson
  );
  res.status(201).json(newPrompt);
}

export async function getUserPrompts(req: AuthRequest, res: Response): Promise<void> {
  const userId = req.user?.userId;
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const {
    page = 1,
    limit = 10,
    search,
    categoryId,
    subCategoryId,
    date,
    tzOffset,
  } = req.query;

  const result = await promptService.getUserPrompts({
    userId: Number(userId),
    page: Number(page),
    limit: Number(limit),
    search: search as string,
    categoryId: categoryId ? Number(categoryId) : undefined,
    subCategoryId: subCategoryId ? Number(subCategoryId) : undefined,
    date: date as string | undefined,
    tzOffset: tzOffset ? Number(tzOffset) : 0,
  });

  res.json(result);
}

export const getAllPrompts = [
  async (req: Request, res: Response) => {
    try {
      const {
        page = 1,
        limit = 10,
        userId,
        categoryId,
        subCategoryId,
        search,
        date,
        tzOffset,
      } = req.query;

      const result = await promptService.getAllPrompts({
        page: Number(page),
        limit: Number(limit),
        userId: userId ? Number(userId) : undefined,
        categoryId: categoryId ? Number(categoryId) : undefined,
        subCategoryId: subCategoryId ? Number(subCategoryId) : undefined,
        search: search as string,
        date: date as string | undefined,
        tzOffset: tzOffset ? Number(tzOffset) : 0,
      });

      res.json(result);
    } catch (err: any) {
      res.status(400).json({ message: 'Invalid query or database error.', error: err.message });
    }
  },
];