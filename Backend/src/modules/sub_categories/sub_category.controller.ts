import { Request, Response } from 'express';
import * as subCategoryService from './sub_category.service';

export async function createSubCategory(req: Request, res: Response): Promise<void> {
  const { name, categoryId } = req.body;
  if (!name || !categoryId || name.length > 100) {
    res.status(400).json({ message: 'Name and categoryId are required and name must be <= 100 chars.' });
    return;
  }
  try {
    const subCategory = await subCategoryService.createSubCategory(name, Number(categoryId));
    res.status(201).json(subCategory);
    return;
  } catch (err: any) {
    if (err.code === 'P2003') {
      // Prisma foreign key constraint failed
      res.status(400).json({ message: 'Category does not exist.' });
      return;
    }
    if (err.message && err.message.includes('already exists')) {
      res.status(409).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: 'Failed to create subcategory.' });
    return;
  }
}

export async function getSubCategoriesByCategory(req: Request, res: Response): Promise<void> {
  const { categoryId } = req.params;
  if (!categoryId) {
    res.status(400).json({ message: 'categoryId is required.' });
    return;
  }
  const subCategories = await subCategoryService.getSubCategoriesByCategory(Number(categoryId));
  res.json(subCategories);
  return;
}