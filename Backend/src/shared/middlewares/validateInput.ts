import { Request, Response, NextFunction } from 'express';


export function validateLoginInput(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  // Email validation (simple regex)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email) || email.length > 100) {
    res.status(400).json({ message: 'Invalid or missing email.' });
    return;
  }

  // Password validation
  if (!password || typeof password !== 'string' || password.length < 6) {
    res.status(400).json({ message: 'Invalid or missing password.' });
    return;
  }

  next();
}

export function validateRegisterInput(req: Request, res: Response, next: NextFunction) {
  const { name, email, phone, password } = req.body;

  // Name validation
  if (!name || typeof name !== 'string' || name.length > 100) {
    res.status(400).json({ message: 'Invalid or missing name.' });
    return;
  }

  // Email validation (simple regex)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email) || email.length > 100) {
    res.status(400).json({ message: 'Invalid or missing email.' });
    return;
  }

  // Phone validation (example: 7-20 digits, numbers only)
  const phoneRegex = /^\+?\d{7,20}$/;
  if (!phone || typeof phone !== 'string' || !phoneRegex.test(phone)) {
    res.status(400).json({ message: 'Invalid or missing phone number.' });
    return;
  }

  // Password validation
  if (!password || typeof password !== 'string' || password.length < 6) {
    res.status(400).json({ message: 'Invalid or missing password.' });
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