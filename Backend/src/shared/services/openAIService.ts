import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateLesson(
  prompt: string,
  category: string,
  subCategory: string
): Promise<string> {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `You are an expert teacher. When given a prompt, generate a complete, student-facing lesson that directly teaches the material, as if you are teaching the student yourself. The lesson must be about the category "${category}" and subcategory "${subCategory}". 
Most importantly, focus your explanation on the user's prompt: "${prompt}". Make sure the lesson is centered around this prompt, addressing it in detail and making it the main subject of your explanation. Do not ignore or generalize the prompt—treat it as the specific topic the user wants to learn about within the given category and subcategory. Format the lesson with a title, introduction, main content, and summary. `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    max_tokens: 800,
    temperature: 0.7,
  });

  return response.choices[0]?.message?.content?.trim() || 'No response generated.';
}