import { useState, useEffect } from 'react';
import { PromptHistory } from '../types';

const LESSON_KEY = 'currentLesson';
const PROMPT_KEY = 'generatedPrompt';
const CATEGORY_KEY = 'selectedCategory';
const SUBCATEGORY_KEY = 'selectedSubcategory';

export function useLessonState() {
  const [currentLesson, setCurrentLesson] = useState<PromptHistory | null>(() => {
    const saved = localStorage.getItem(LESSON_KEY);
    return saved ? JSON.parse(saved) : null;
  });
  const [generatedPrompt, setGeneratedPrompt] = useState<string>(() => {
    return localStorage.getItem(PROMPT_KEY) || '';
  });

  useEffect(() => {
    if (currentLesson) {
      localStorage.setItem(LESSON_KEY, JSON.stringify(currentLesson));
    } else {
      localStorage.removeItem(LESSON_KEY);
    }
  }, [currentLesson]);

  useEffect(() => {
    if (generatedPrompt) {
      localStorage.setItem(PROMPT_KEY, generatedPrompt);
    } else {
      localStorage.removeItem(PROMPT_KEY);
    }
  }, [generatedPrompt]);

  const handleLessonGenerated = (lesson: PromptHistory) => setCurrentLesson(lesson);

  const handleBackToForm = () => {
    setCurrentLesson(null);
    setGeneratedPrompt('');
    localStorage.removeItem(LESSON_KEY);
    localStorage.removeItem(PROMPT_KEY);
    localStorage.removeItem(CATEGORY_KEY);
    localStorage.removeItem(SUBCATEGORY_KEY);
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  return {
    currentLesson,
    setCurrentLesson,
    generatedPrompt,
    setGeneratedPrompt,
    handleLessonGenerated,
    handleBackToForm,
    formatDate,
  };
}