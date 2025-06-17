import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import * as subCategoryController from './sub_category.controller';
import { requireAuth, requireRole } from '../../shared/middlewares/auth';
import { Role } from '@prisma/client';

const router = Router();

/**
 * @openapi
 * /api/subcategories:
 *   post:
 *     summary: Create a new subcategory (admin only)
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
 *               categoryId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Subcategory created
 */
router.post('/', requireAuth, requireRole(Role.admin), asyncHandler(subCategoryController.createSubCategory));

/**
 * @openapi
 * /api/subcategories/category/{categoryId}:
 *   get:
 *     summary: Get subcategories by category
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of subcategories
 */
router.get('/category/:categoryId', asyncHandler(subCategoryController.getSubCategoriesByCategory));

export default router;