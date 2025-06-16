import { Response } from 'express';
import * as promptService from './prompt.service';
import { AuthRequest } from '../../shared/middlewares/auth';

export async function createPrompt(req: AuthRequest, res: Response): Promise<void> {
  const userId = req.user?.userId;
  const { categoryId, subCategoryId, prompt, response } = req.body;
  if (
    !userId || !categoryId || !subCategoryId || !prompt || !response ||
    prompt.length > 10000
  ) {
    res.status(400).json({ message: 'All fields are required and prompt must be <= 10000 chars.' });
    return;
  }
  const newPrompt = await promptService.createPrompt(
    userId,
    Number(categoryId),
    Number(subCategoryId),
    prompt,
    response
  );
  res.status(201).json(newPrompt);
  return;
}

export async function getUserPrompts(req: AuthRequest, res: Response): Promise<void> {
  const userId = req.user?.userId;
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  const prompts = await promptService.getUserPrompts(userId);
  res.json(prompts);
  return;
}

