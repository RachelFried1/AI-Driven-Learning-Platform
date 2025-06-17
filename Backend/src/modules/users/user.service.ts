import prisma from '../../shared/config/prisma';

// Get user by ID (for admin or internal use)
export async function getUserById(userId: number) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, phone: true, role: true }
  });
}

// Update user by ID (for admin)
export async function updateUserById(userId: number, data: { name?: string; phone?: string }) {
  return prisma.user.update({
    where: { id: userId },
    data
  });
}