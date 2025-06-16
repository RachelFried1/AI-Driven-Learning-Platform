import { Request, Response } from 'express';
import * as categoryService from './category.service';

export async function createCategory(req: Request, res: Response): Promise<void> {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ message: 'Name is required.' });
    return;
  }
  const category = await categoryService.createCategory(name);
  res.status(201).json(category);
}

export async function getAllCategories(req: Request, res: Response): Promise<void> {
  const categories = await categoryService.getAllCategories();
  res.json(categories);
}