import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import * as authController from './auth.controller';
import { validateRegisterInput } from '../../shared/middlewares/validateInput';

const router = Router();

router.post('/register', validateRegisterInput, asyncHandler(authController.register));
router.post('/login', asyncHandler(authController.login));

export default router;