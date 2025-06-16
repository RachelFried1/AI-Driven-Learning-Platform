import express from 'express';
import cors from 'cors';
import asyncHandler from 'express-async-handler';
// Middlewares
import { requireAuth, requireRole } from './shared/middlewares/auth';
import { errorHandler } from './shared/middlewares/errorHandler';
import { validateRegisterInput, validatePromptInput } from './shared/middlewares/validateInput';
import { Role } from '@prisma/client';
// Routes
import authRoutes from './modules/auth/auth.routes';
import categoryRoutes from './modules/categories/category.routes';
import subCategoryRoutes from './modules/sub_categories/sub_category.routes';
import promptRoutes from './modules/prompts/prompt.routes';
import adminRoutes from './modules/admin/admin.routes';

const app = express();

// --- CORS Middleware ---
app.use(cors({
  origin: 'http://localhost:3000', // Change to your frontend URL if needed
  credentials: true,
}));
// --- JSON Body Parser ---
app.use(express.json());
// --- Auth Routes ---
app.use('/api/auth', authRoutes);
// --- Category Routes ---
app.use('/api/categories', categoryRoutes);
// --- Subcategory Routes ---
app.use('/api/sub_categories', subCategoryRoutes);
// --- Prompt Routes ---
app.use('/api/prompts', promptRoutes);
// --- Admin Routes ---
app.use('/api/admin', adminRoutes);
// --- Global Error Handler ---
app.use(errorHandler);

export default app;