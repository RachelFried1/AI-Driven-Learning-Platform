import { Request, Response } from 'express';
import * as authService from './auth.service';

export async function register(req: Request, res: Response): Promise<void> {
  const { name, email, phone, password } = req.body;
  if (
    !name || !email || !phone || !password ||
    name.length > 100 ||
    email.length > 100 ||
    phone.length > 20
  ) {
    res.status(400).json({ message: 'Invalid or missing fields.' });
    return;
  }
  try {
    const user = await authService.registerUser(name, email, phone, password);
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    });
    return;
  } catch (err: any) {
    // Handle unique constraint error for email or phone
    if (err.code === 'P2002') {
      res.status(409).json({ message: 'User with this email or phone already exists.' });
      return;
    }
    res.status(500).json({ message: 'Registration failed.' });
    return;
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: 'Email and password required.' });
    return;
  }
  const user = await authService.validateUser(email, password);
  if (!user) {
    res.status(401).json({ message: 'Invalid email or password.' });
    return;
  }
  const token = authService.generateJWT(user);
  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  });
  return;
}