import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const categories = [
  {
    category: "Science",
    subcategories: [
      "Physics",
      "Chemistry",
      "Biology",
      "Earth Science",
      "Environmental Science",
      "Astronomy",
      "Anatomy & Physiology",
      "Marine Biology",
      "Genetics",
      "Ecology"
    ]
  },
  {
    category: "Mathematics",
    subcategories: [
      "Arithmetic",
      "Algebra",
      "Geometry",
      "Trigonometry",
      "Calculus",
      "Statistics",
      "Probability",
      "Linear Algebra",
      "Number Theory",
      "Discrete Mathematics"
    ]
  },
  {
    category: "Language & Literature",
    subcategories: [
      "Grammar",
      "Vocabulary",
      "Reading Comprehension",
      "Essay Writing",
      "Literary Analysis",
      "Creative Writing",
      "Poetry",
      "Classical Literature",
      "Modern Literature",
      "Public Speaking"
    ]
  },
  {
    category: "Social Studies / Humanities",
    subcategories: [
      "History",
      "Geography",
      "Civics & Government",
      "Economics",
      "Sociology",
      "Anthropology",
      "Political Science",
      "Religious Studies",
      "Cultural Studies",
      "Philosophy"
    ]
  },
  {
    category: "Computer Science & Technology",
    subcategories: [
      "Programming",
      "Web Development",
      "Databases",
      "Algorithms & Data Structures",
      "Cybersecurity",
      "Artificial Intelligence",
      "Software Engineering",
      "Operating Systems",
      "Networking",
      "Robotics"
    ]
  },
  {
    category: "Health & Medicine",
    subcategories: [
      "Human Biology",
      "Nutrition",
      "Public Health",
      "Mental Health",
      "First Aid",
      "Medical Terminology",
      "Pharmacology",
      "Nursing",
      "Anatomy",
      "Disease Prevention"
    ]
  },
  {
    category: "Arts",
    subcategories: [
      "Visual Arts",
      "Music Theory",
      "Art History",
      "Performing Arts",
      "Photography",
      "Sculpture",
      "Film & Media Studies",
      "Graphic Design",
      "Digital Art"
    ]
  },
  {
    category: "Languages",
    subcategories: [
      "Spanish",
      "French",
      "German",
      "Mandarin Chinese",
      "Arabic",
      "Latin",
      "Japanese",
      "Italian",
      "Russian",
      "English as a Second Language (ESL)"
    ]
  },
  {
    category: "Business & Finance",
    subcategories: [
      "Accounting",
      "Marketing",
      "Business Management",
      "Entrepreneurship",
      "Finance",
      "Economics",
      "Business Law",
      "Investing",
      "Human Resources",
      "Supply Chain Management"
    ]
  },
  {
    category: "Test Prep / Study Skills",
    subcategories: [
      "SAT/ACT",
      "GRE/GMAT",
      "TOEFL/IELTS",
      "AP Exams",
      "Study Techniques",
      "Time Management",
      "Note Taking",
      "Critical Thinking",
      "Exam Strategies",
      "Memory Techniques"
    ]
  }
];

async function seedCategoriesAndSubcategories() {
  for (const cat of categories) {
    const category = await prisma.category.upsert({
      where: { name: cat.category },
      update: {},
      create: { name: cat.category },
    });

    for (const sub of cat.subcategories) {
      await prisma.subCategory.upsert({
        where: { unique_subcategory_name_per_category: { name: sub, categoryId: category.id } },
        update: {},
        create: {
          name: sub,
          categoryId: category.id,
        },
      });
    }
  }
}

async function seedAdminUser() {
  const hashedPassword = await bcrypt.hash('adminpassword', 10);

  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@example.com',
      phone: '0000000000',
      password: hashedPassword,
      role: Role.admin,
    },
  });

  console.log('Admin user created!');
}

async function main() {
  await seedCategoriesAndSubcategories();
  await seedAdminUser();
  console.log('Categories, subcategories, and admin user seeded!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });