import express from 'express';
import cors from 'cors';
import asyncHandler from 'express-async-handler';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import { requireAuth, requireRole } from './shared/middlewares/auth';
import { errorHandler } from './shared/middlewares/errorHandler';
import { validateRegisterInput, validatePromptInput } from './shared/middlewares/validateInput';
import { Role } from '@prisma/client';

import authRoutes from './modules/auth/auth.routes';
import categoryRoutes from './modules/categories/category.routes';
import subCategoryRoutes from './modules/sub_categories/sub_category.routes';
import promptRoutes from './modules/prompts/prompt.routes';
import adminRoutes from './modules/admin/admin.routes';
import usersRoutes from './modules/users/user.routes'; 

const app = express();

app.use(cors({
  origin: 'http://localhost:8080', 
  credentials: true,
}));

app.use(express.json());

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
  apis: ['./src/modules/**/*.ts'], 
});

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/auth', authRoutes);

app.use('/api/categories', categoryRoutes);

app.use('/api/subcategories', subCategoryRoutes);

app.use('/api/prompts', promptRoutes);

app.use('/api/admin', adminRoutes);

app.use('/api/users', usersRoutes);

app.use(errorHandler);

export default app;