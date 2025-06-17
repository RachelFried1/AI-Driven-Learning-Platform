import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import * as categoryController from './category.controller';
import { requireAuth, requireRole } from '../../shared/middlewares/auth';
import { Role } from '@prisma/client';

const router = Router();

/**
 * @openapi
 * /api/categories:
 *   post:
 *     summary: Create a new category (admin only)
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
 *     responses:
 *       201:
 *         description: Category created
 */
router.post('/', requireAuth, requireRole(Role.admin), asyncHandler(categoryController.createCategory));

/**
 * @openapi
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     responses:
 *       200:
 *         description: List of categories
 */
router.get('/', asyncHandler(categoryController.getAllCategories));

export default router;