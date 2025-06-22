import React from 'react';
import { PromptHistory } from '../types';
import PromptForm from '@/components/PromptSubmission/PromptForm/PromptForm';
import MarkdownLesson from '@/components/Lesson/MarkdownLesson';
import LessonsHeader from '@/components/Lesson/LessonsHeader';
import LessonsQuickStats from '@/components/Lesson/LessonsQuickStats';
import LessonHeaderBar from '@/components/Lesson/LessonHeaderBar';
import LessonActions from '@/components/Lesson/LessonActions';
import { useLessonState } from '@/hooks/useLessons';
import { useAppSelector } from '@/app/hooks';

const Lessons: React.FC = () => {
  const {
    currentLesson,
    generatedPrompt,
    setGeneratedPrompt,
    handleLessonGenerated,
    handleBackToForm,
    formatDate,
  } = useLessonState();

  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {user?.role === 'admin' && (
          <div className="bg-yellow-100 text-yellow-800 p-2 text-center font-semibold mb-4">
            Admin preview mode — you are viewing user features for testing purposes.
          </div>
        )}
        {!currentLesson ? (
          <div className="space-y-8">
            <LessonsHeader />
            <PromptForm
              onLessonGenerated={handleLessonGenerated}
              initialPrompt={generatedPrompt}
              setPrompt={setGeneratedPrompt}
            />
            <LessonsQuickStats />
          </div>
        ) : (
          <div className="space-y-6">
            <LessonHeaderBar
              lesson={currentLesson}
              onBack={handleBackToForm}
              formatDate={formatDate}
            />
            <MarkdownLesson
              prompt={currentLesson.prompt}
              markdown={currentLesson.response}
            />
            <LessonActions onBack={handleBackToForm} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Lessons;