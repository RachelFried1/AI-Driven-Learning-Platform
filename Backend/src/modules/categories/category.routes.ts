import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import * as categoryController from './category.controller';
import { requireAuth, requireRole } from '../../shared/middlewares/auth';
import { Role } from '@prisma/client';

const router = Router();

router.post('/', requireAuth, requireRole(Role.admin), asyncHandler(categoryController.createCategory));
router.get('/', asyncHandler(categoryController.getAllCategories));

export default router;