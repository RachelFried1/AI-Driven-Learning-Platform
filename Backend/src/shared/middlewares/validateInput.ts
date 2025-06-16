import { Request, Response, NextFunction } from 'express';

export function validateRegisterInput(req: Request, res: Response, next: NextFunction) {
  const { name, email, phone, password } = req.body;
  if (
    !name || !email || !phone || !password ||
    name.length > 100 ||
    email.length > 100 ||
    phone.length > 20 ||
    password.length < 6
  ) {
    res.status(400).json({ message: 'Invalid or missing registration fields.' });
    return;
  }
  next();
}

export function validatePromptInput(req: Request, res: Response, next: NextFunction) {
  const { categoryId, subCategoryId, prompt } = req.body;
  if (!categoryId || !subCategoryId || !prompt || prompt.length > 10000) {
    res.status(400).json({ message: 'Invalid prompt input.' });
    return;
  }
  next();
}