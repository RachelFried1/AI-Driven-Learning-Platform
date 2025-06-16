import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { requireAuth, requireRole } from '../../shared/middlewares/auth';
import { Role } from '@prisma/client';
import * as adminController from './admin.controller';

const router = Router();

router.get('/users', requireAuth, requireRole(Role.admin), asyncHandler(adminController.listAllUsers));
router.get('/users/:id/prompts', requireAuth, requireRole(Role.admin), asyncHandler(adminController.getUserPrompts));

export default router;