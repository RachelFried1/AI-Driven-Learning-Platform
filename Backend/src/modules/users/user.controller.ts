import { Request, Response } from 'express';
import prisma from '../../shared/config/prisma';
import { AuthRequest } from '../../shared/middlewares/auth';


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

export async function listUsers(req: Request, res: Response): Promise<void> {
  const { search = '', page = 1, limit = 20 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  const where: any = {};
if (search) {
  where.OR = [
    { name: { contains: String(search), mode: 'insensitive' } },
    { email: { contains: String(search), mode: 'insensitive' } },
  ];
}

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: Number(limit),
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    }),
    prisma.user.count({ where }),
  ]);

  res.json({
    items: users,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / Number(limit)),
  });
}