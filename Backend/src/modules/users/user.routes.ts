import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import * as usersController from './user.controller';
import { requireAuth } from '../../shared/middlewares/auth';

const router = Router();

/**
 * @openapi
 * /api/users/me:
 *   get:
 *     summary: Get current user's profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 */
router.get('/me', requireAuth, asyncHandler(usersController.getMyProfile));

/**
 * @openapi
 * /api/users/me:
 *   put:
 *     summary: Update current user's profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated user profile
 */
router.put('/me', requireAuth, asyncHandler(usersController.updateMyProfile));

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: List all users (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by name or email
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page
 *     responses:
 *       200:
 *         description: Paginated list of users
 */
router.get(
  '/',
  requireAuth,
  // Optionally: requireRole(Role.admin),
  asyncHandler(usersController.listUsers)
);

export default router;