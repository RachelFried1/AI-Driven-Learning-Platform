import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

interface GeneratedLessonProps {
  prompt: string;
  title: string;
  introduction: string;
  steps: string[];
  exampleTitle?: string;
  exampleSteps?: string[];
  summary: string;
}

const GeneratedLesson: React.FC<GeneratedLessonProps> = ({
  prompt,
  title,
  introduction,
  steps,
  exampleTitle,
  exampleSteps,
  summary,
}) => (
  <Card className="max-w-3xl mx-auto my-8 shadow-lg">
    <CardHeader>
      <CardTitle className="text-3xl font-bold text-blue-700 mb-2">Your AI-Generated Lesson</CardTitle>
      <CardDescription className="text-lg text-gray-700 mb-4">
        <span className="font-semibold text-gray-900">Your Request:</span> {prompt}
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-blue-600 mb-2">{title}</h2>
        <div className="text-gray-800 text-lg">{introduction}</div>
      </section>
      <section>
        <h3 className="text-xl font-semibold text-blue-500 mb-2">Steps</h3>
        <ol className="list-decimal pl-6 space-y-1 text-gray-800">
          {steps.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </section>
      {exampleTitle && exampleSteps && (
        <section>
          <h3 className="text-xl font-semibold text-purple-500 mb-2">{exampleTitle}</h3>
          <ol className="list-decimal pl-8 space-y-1 text-gray-800">
            {exampleSteps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </section>
      )}
      <section>
        <h3 className="text-xl font-semibold text-green-600 mb-2">Summary</h3>
        <div className="text-gray-800">{summary}</div>
      </section>
    </CardContent>
  </Card>
);

export default GeneratedLesson;