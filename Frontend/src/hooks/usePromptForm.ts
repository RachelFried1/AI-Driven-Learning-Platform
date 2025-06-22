import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchCategories, fetchSubcategories } from '@/features/categories/categoriesSlice';
import { promptService } from '@/services/prompt';
import { PromptSubmission } from '@/types';
import { toast } from '@/hooks/use-toast';

const CATEGORY_KEY = 'selectedCategory';
const SUBCATEGORY_KEY = 'selectedSubcategory';

export function usePromptForm({
  onLessonGenerated,
  initialPrompt = '',
  setPrompt,
}: {
  onLessonGenerated: (lesson: any) => void;
  initialPrompt?: string;
  setPrompt: (prompt: string) => void;
}) {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const [selectedCategory, setSelectedCategory] = useState(() => localStorage.getItem(CATEGORY_KEY) || '');
  const [selectedSubcategory, setSelectedSubcategory] = useState(() => localStorage.getItem(SUBCATEGORY_KEY) || '');
  const [prompt, setLocalPrompt] = useState(initialPrompt);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showGuidanceBot, setShowGuidanceBot] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => { dispatch(fetchCategories()); }, [dispatch]);
  useEffect(() => {
    if (selectedCategory) dispatch(fetchSubcategories(selectedCategory));
  }, [dispatch, selectedCategory]);
  useEffect(() => { setLocalPrompt(initialPrompt); }, [initialPrompt]);
  useEffect(() => {
    selectedCategory
      ? localStorage.setItem(CATEGORY_KEY, selectedCategory)
      : localStorage.removeItem(CATEGORY_KEY);
  }, [selectedCategory]);
  useEffect(() => {
    selectedSubcategory
      ? localStorage.setItem(SUBCATEGORY_KEY, selectedSubcategory)
      : localStorage.removeItem(SUBCATEGORY_KEY);
  }, [selectedSubcategory]);

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalPrompt(e.target.value);
    setPrompt(e.target.value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setSelectedSubcategory('');
    localStorage.removeItem(SUBCATEGORY_KEY);
  };

  const handleSubcategoryChange = (value: string) => setSelectedSubcategory(value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) return setShowAuthModal(true);
    if (!selectedCategory || !selectedSubcategory || !prompt.trim()) {
      toast({
        title: "Incomplete form",
        description: "Please select a category, subcategory, and enter your prompt",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const submission: PromptSubmission = {
        categoryId: selectedCategory,
        subCategoryId: selectedSubcategory,
        prompt: prompt.trim(),
      };
      const response = await promptService.submitPrompt(submission);
      onLessonGenerated(response);
      toast({ title: "Lesson generated!", description: "Your AI lesson is ready" });
      setLocalPrompt('');
      setPrompt('');
      setSelectedCategory('');
      setSelectedSubcategory('');
      localStorage.removeItem(CATEGORY_KEY);
      localStorage.removeItem(SUBCATEGORY_KEY);
    } catch (error) {
      toast({
        title: "Failed to generate lesson",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGuidanceComplete = (_: any, finalPrompt: string) => {
    setLocalPrompt(finalPrompt);
    setPrompt(finalPrompt);
    setShowGuidanceBot(false);
    toast({
      title: "Prompt generated!",
      description: "Your personalized prompt is ready. Review and submit when ready.",
    });
  };

  return {
    selectedCategory,
    selectedSubcategory,
    prompt,
    isSubmitting,
    showGuidanceBot,
    showAuthModal,
    isAuthenticated,
    handlePromptChange,
    handleCategoryChange,
    handleSubcategoryChange,
    handleSubmit,
    handleGuidanceComplete,
    setShowGuidanceBot,
    setShowAuthModal,
  };
}