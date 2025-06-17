// test-openai.ts
import 'dotenv/config';
import { generateLesson } from './src/shared/services/openAIService';

async function main() {
  const prompt = 'teach me about electricity';
  const category = 'Science';
  const subCategory = 'electricity';

  const lesson = await generateLesson(prompt, category, subCategory);
  console.log('AI Lesson:', lesson);
}

main().catch(console.error);