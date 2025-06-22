import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

interface MarkdownLessonProps {
  prompt: string;
  markdown: string;
}

const MarkdownLesson: React.FC<MarkdownLessonProps> = ({ prompt, markdown }) => (
  <Card className="max-w-3xl mx-auto my-8 shadow-lg">
    <CardHeader>
      <CardTitle className="text-3xl font-bold text-blue-700 mb-2">Your AI-Generated Lesson</CardTitle>
      <CardDescription className="text-lg text-gray-700 mb-4">
        <span className="font-semibold text-gray-900">Your Request:</span> {prompt}
      </CardDescription>
    </CardHeader>
    <CardContent className="prose prose-lg max-w-none text-gray-900">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </CardContent>
  </Card>
);

export default MarkdownLesson;