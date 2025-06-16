import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import * as subCategoryController from './sub_category.controller';
import { requireAuth, requireRole } from '../../shared/middlewares/auth';
import { Role } from '.prisma/client/default';

const router = Router();

router.post('/', requireAuth, requireRole(Role.admin), asyncHandler(subCategoryController.createSubCategory));
router.get('/category/:categoryId', asyncHandler(subCategoryController.getSubCategoriesByCategory));

export default router;