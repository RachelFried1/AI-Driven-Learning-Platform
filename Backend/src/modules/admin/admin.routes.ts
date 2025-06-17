import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import * as adminController from './admin.controller';
import { requireAuth, requireRole } from '../../shared/middlewares/auth';
import { Role } from '@prisma/client';

const router = Router();

/**
 * @openapi
 * /api/admin/users:
 *   get:
 *     summary: List all users (admin only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 */
router.get(
  '/users',
  requireAuth,
  requireRole(Role.admin),
  asyncHandler(adminController.listAllUsers)
);

/**
 * @openapi
 * /api/admin/users/{id}/prompts:
 *   get:
 *     summary: Get a user's prompt history (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of user's prompts
 */
router.get(
  '/users/:id/prompts',
  requireAuth,
  requireRole(Role.admin),
  asyncHandler(adminController.getUserPrompts)
);

export default router;