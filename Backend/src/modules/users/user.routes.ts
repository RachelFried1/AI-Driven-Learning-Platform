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

export default router;