import { Response } from 'express';
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

// Get all prompts for the authenticated user
export async function getUserPrompts(req: AuthRequest, res: Response): Promise<void> {
  const userId = req.user?.userId;
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  const prompts = await promptService.getUserPrompts(userId);
  res.json(prompts);
}

// (Optional) Admin: List all prompts (if needed for admin dashboard)
export async function listAllPrompts(req: AuthRequest, res: Response): Promise<void> {
  const prompts = await promptService.listAllPrompts();
  res.json(prompts);
}