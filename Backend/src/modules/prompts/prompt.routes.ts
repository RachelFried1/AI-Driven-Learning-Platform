import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import * as promptController from './prompt.controller';
import { requireAuth ,requireRole} from '../../shared/middlewares/auth';
import { Role } from '@prisma/client';
import { validatePromptInput } from '../../shared/middlewares/validateInput';

const router = Router();

router.post('/', requireAuth, validatePromptInput, asyncHandler(promptController.createPrompt));
router.get('/my', requireAuth, asyncHandler(promptController.getUserPrompts));



export default router;