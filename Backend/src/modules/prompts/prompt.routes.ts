import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import * as promptController from './prompt.controller';
import { requireAuth, requireRole } from '../../shared/middlewares/auth';
import { validatePromptInput } from '../../shared/middlewares/validateInput';
import { Role } from '@prisma/client';

const router = Router();

/**
 * @openapi
 * /api/prompts:
 *   post:
 *     summary: Submit a new prompt (authenticated)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: integer
 *               subCategoryId:
 *                 type: integer
 *               prompt:
 *                 type: string
 *     responses:
 *       201:
 *         description: Prompt submitted and lesson generated
 */
router.post(
  '/',
  requireAuth,
  validatePromptInput,
  asyncHandler(promptController.createPrompt)
);

/**
 * @openapi
 * /api/prompts/my:
 *   get:
 *     summary: Get authenticated user's prompt history
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's prompts
 */
router.get(
  '/my',
  requireAuth,
  asyncHandler(promptController.getUserPrompts)
);

/**
 * @openapi
 * /api/prompts/all:
 *   get:
 *     summary: List all prompts with pagination and filtering (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         description: Filter by user ID
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *         description: Filter by category ID
 *       - in: query
 *         name: subCategoryId
 *         schema:
 *           type: integer
 *         description: Filter by subcategory ID
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in prompt or response
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter by creation date (start)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter by creation date (end)
 *     responses:
 *       200:
 *         description: Paginated list of prompts
 */
router.get(
  '/all',
  requireAuth,
  requireRole(Role.admin),
  ...promptController.getAllPrompts 
);

export default router;