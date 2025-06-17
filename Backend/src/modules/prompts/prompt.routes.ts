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
 * /api/prompts/admin:
 *   get:
 *     summary: List all prompts (admin only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all prompts
 */
router.get(
  '/admin',
  requireAuth,
  requireRole(Role.admin),
  asyncHandler(promptController.listAllPrompts)
);

export default router;