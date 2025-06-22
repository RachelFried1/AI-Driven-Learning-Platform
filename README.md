# AI Learning Platform

A full-stack AI-powered learning platform that empowers users to generate personalized lessons using advanced AI technology.

---

## 📍 Overview

The AI Learning Platform is an intelligent and interactive web application designed to make personalized education accessible. Users can:

* Register/log in securely
* Choose a category and subcategory
* Submit a prompt for lesson generation
* Instantly receive AI-tailored educational content
* Track lesson history (with pagination and filtering)
* (Admins only) View users and view all prompts (with pagination and filtering)

---

## 🚀 Technologies Used

### Frontend

* React (with TypeScript)
* Redux Toolkit
* React Router
* Tailwind CSS

### Backend

* Node.js + Express
* Prisma ORM
* JWT Authentication
* bcrypt for password hashing
* OpenAI API for content generation
* Swagger for API documentation

### Database

* PostgreSQL (via Docker Compose)

---

## ✨ Key Features

* **User Authentication**: Register/login with secure JWT-based sessions
* **AI-Powered Lessons**: Generate personalized educational content based on selected categories and preferences
* **Lesson History**: Users can view their entire prompt and lesson history with pagination and filtering
* **Admin Dashboard**: Role-based access to view users and prompts, with pagination and filtering capabilities
* **Validation and Error Handling**: API routes and frontend forms include proper validation and messaging
* **Validation Middleware**: Middleware functions handle request validation, authentication, and role-based access control
* **Automated Backend Testing**: Includes Jest-based test suite for authentication, routes, and error handling
* **Mobile-Friendly Design**: Fully responsive UI with modern styling

---

## 🛡️ Admin Access

Admin credentials can be seeded or created manually.
Admins have access to:

* All users
* All prompt histories

The admin access is:

* Email: [admin@example.com](mailto:admin@example.com)
* Password: adminpassword

---

## 📄 Assumptions Made

* Node.js and npm are installed on your system
* Docker and Docker Compose are installed and running
* Backend and frontend run on separate ports
* You have (or can mock) a valid OpenAI API key

---

## ⚡️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/RachelFried1/ai-learning-platform.git
cd ai-learning-platform
```

### 2. Environment Variables

Copy the example environment file and add your secrets:

```bash
cp backend/.env.example backend/.env
cp backend/.env.test.example backend/.env.test
```

Set your OpenAI API key and jwt secrets

---

## 🛠️ How to Run Locally

### Start PostgreSQL via Docker Compose

```bash
docker compose up -d
```

### Start the Backend

```bash
cd backend
npm install
npx prisma migrate dev
npx prisma db seed
npx ts-node-dev src/server.ts
```

Server runs at: `http://localhost:4000`

### Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at: `http://localhost:3000`

---

## 📊 Sample `.env.example` (Backend)

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ai_learning"
JWT_SECRET="your_jwt_secret"
OPENAI_API_KEY="your_openai_api_key"
PORT=4000
```

---

## 🐳 Docker Compose Info

The project includes a `docker-compose.yml` file to launch PostgreSQL databases for development and testing:

### Start services:

```bash
docker compose up -d
```

### Stop all containers:

```bash
docker compose down
```

### Access Prisma Studio:

```bash
npx prisma studio
```

---

## 🔬 API Documentation (Swagger)

API documentation is implemented using Swagger and is available at:

```
http://localhost:4000/api-docs
```

Swagger setup uses `swagger-jsdoc` and includes JWT bearer authentication:

---

## 🧪 Backend Testing Instructions

Automated backend tests are configured and runnable using Jest.

### Setup Test Environment

1. Ensure Docker is running
2. Copy environment variables for the test environment:

```bash
cp backend/.env.test.example backend/.env.test
```

Example content of `.env.test.example`:

```env
DATABASE_URL=postgresql://dev_user:dev_password@testdb:5432/ai_learning_platform_test
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
OPENAI_API_KEY=your_openai_api_key
NODE_ENV=test
```

3. Run backend tests:

```bash
cd backend
npm test
```

---

## 🛠️ Frontend Testing Flows

* **Guest**: Access homepage, attempt to use prompt -> redirected to login
* **User**: Register, login, select categories, generate prompts, view history
* **Admin**: Login, access admin dashboard, manage users and categories;

  when viewing Lesson or History pages as an admin, a banner appears noting:  "You are in admin mode, previewing this page as a user."
* **Validation**: Try submitting invalid forms
* **Error States**: Simulate backend disconnection or invalid login

---

## 🤖 AI Integration

* OpenAI API used for generating dynamic educational content
* Dev mode: can mock responses using conditional environment settings

---

## 📖 License

MIT © Rachel Fried | Full-Stack AI-Driven Platform | 2025
