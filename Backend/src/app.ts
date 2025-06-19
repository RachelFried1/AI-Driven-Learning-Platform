import express from 'express';
import cors from 'cors';
import asyncHandler from 'express-async-handler';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

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
import usersRoutes from './modules/users/user.routes'; // <-- Make sure this path is correct

const app = express();

// --- CORS Middleware ---
app.use(cors({
  origin: 'http://localhost:8080', // Change to your frontend URL if needed
  credentials: true,
}));

// --- JSON Body Parser ---
app.use(express.json());

// --- Swagger/OpenAPI Documentation ---
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: { title: 'AI Learning Platform API', version: '1.0.0' },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/modules/**/*.ts'], // Path to your route files with JSDoc comments
});
// Serve Swagger UI
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- Auth Routes ---
app.use('/api/auth', authRoutes);

// --- Category Routes ---
app.use('/api/categories', categoryRoutes);

// --- Subcategory Routes ---
app.use('/api/subcategories', subCategoryRoutes);

// --- Prompt Routes ---
app.use('/api/prompts', promptRoutes);

// --- Admin Routes ---
app.use('/api/admin', adminRoutes);

// --- Users Routes ---
app.use('/api/users', usersRoutes);

// --- Global Error Handler ---
app.use(errorHandler);

export default app;