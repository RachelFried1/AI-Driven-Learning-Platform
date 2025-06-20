import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import * as authController from './auth.controller';
import { validateLoginInput, validateRegisterInput } from '../../shared/middlewares/validateInput';

const router = Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered
 */
router.post('/register', validateRegisterInput, asyncHandler(authController.register));

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Log in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: JWT token and user info
 */
router.post('/login',validateLoginInput, asyncHandler(authController.login));

export default router;