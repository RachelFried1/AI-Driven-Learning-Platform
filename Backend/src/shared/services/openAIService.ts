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
        content: `You are an expert teacher. When given a prompt, always generate a structured lesson that answers the prompt, but make sure your explanation is framed within the context of the category "${category}" and subcategory "${subCategory}". Format the lesson with a title, introduction, main content, and summary.`,
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