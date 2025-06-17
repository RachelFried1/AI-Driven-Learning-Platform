import { Response } from 'express';
import prisma from '../../shared/config/prisma';
import { AuthRequest } from '../../shared/middlewares/auth';

// Get current user's profile
export async function getMyProfile(req: AuthRequest, res: Response): Promise<void> {
  const userId = req.user?.userId;
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, phone: true, role: true }
  });
  res.json(user);
}

// Update current user's profile
export async function updateMyProfile(req: AuthRequest, res: Response): Promise<void> {
  const userId = req.user?.userId;
  const { name, phone } = req.body;
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  const updated = await prisma.user.update({
    where: { id: userId },
    data: { name, phone }
  });
  res.json({ id: updated.id, name: updated.name, phone: updated.phone });
}