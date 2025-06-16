import { Request, Response } from 'express';
import * as adminService from './admin.service';

export async function listAllUsers(req: Request, res: Response): Promise<void> {
  const users = await adminService.listAllUsers();
  res.json(users);
  return;
}

export async function getUserPrompts(req: Request, res: Response): Promise<void> {
  const userId = Number(req.params.id);
  if (!userId) {
    res.status(400).json({ message: 'User ID required' });
    return;
  }
  const prompts = await adminService.getUserPrompts(userId);
  res.json(prompts);
  return;
}