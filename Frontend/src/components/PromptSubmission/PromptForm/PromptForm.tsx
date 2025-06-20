import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Send } from 'lucide-react';
import { promptService } from '../../../services/prompt';
import { PromptSubmission } from '../../../types';
import { useAuth } from '../../../hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import PromptGuidanceBot from '../PromptGuidanceBot/PromptGuidanceBot';
import AuthModal from '../../Auth/AuthModal';
import { useAppDispatch } from '@/app/hooks';
import { fetchCategories, fetchSubcategories } from '@/features/categories/categoriesSlice';
import CategorySelector from './CategorySelector';
import SubcategorySelector from './SubcategorySelector';
import PromptTextarea from './PromptTextarea';
import GuidanceBotBanner from './GuidanceBotBanner';

interface PromptFormProps {
  onLessonGenerated: (lesson: any) => void;
  initialPrompt?: string;
}

const PromptForm: React.FC<PromptFormProps> = ({ onLessonGenerated, initialPrompt = '' }) => {
  const dispatch = useAppDispatch();

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [prompt, setPrompt] = useState(initialPrompt);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showGuidanceBot, setShowGuidanceBot] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory) {
      dispatch(fetchSubcategories(selectedCategory));
    }
    setSelectedSubcategory('');
  }, [dispatch, selectedCategory]);

  useEffect(() => {
    if (initialPrompt) {
      setPrompt(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

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

      toast({
        title: "Lesson generated!",
        description: "Your AI lesson is ready",
      });

      setPrompt('');
    } catch (error) {
      console.error('Failed to submit prompt:', error);
      toast({
        title: "Failed to generate lesson",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGuidanceComplete = (guidanceData: any, finalPrompt: string) => {
    setPrompt(finalPrompt);
    setShowGuidanceBot(false);
    toast({
      title: "Prompt generated!",
      description: "Your personalized prompt is ready. Review and submit when ready.",
    });
  };

  const canUseGuidanceBot = selectedCategory && selectedSubcategory;

  if (showGuidanceBot) {
    // You may want to pass category/subcategory names here as before
    return (
      <PromptGuidanceBot
        categoryName={selectedCategory}
        subcategoryName={selectedSubcategory}
        onComplete={handleGuidanceComplete}
        onCancel={() => setShowGuidanceBot(false)}
      />
    );
  }

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="h-6 w-6 mr-2 text-blue-600" />
            Create Your AI Lesson
          </CardTitle>
          <CardDescription>
            Select a topic and describe what you'd like to learn. Need help? Use the chat assistant!
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CategorySelector value={selectedCategory} onChange={setSelectedCategory} />
              <SubcategorySelector
                categoryId={selectedCategory}
                value={selectedSubcategory}
                onChange={setSelectedSubcategory}
              />
            </div>

            {canUseGuidanceBot && (
              <GuidanceBotBanner onClick={() => setShowGuidanceBot(true)} />
            )}

            <PromptTextarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              initialPrompt={initialPrompt}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || !selectedCategory || !selectedSubcategory}
            >
              {isSubmitting ? (
                'Generating Lesson...'
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Generate AI Lesson
                </>
              )}
            </Button>

            {!isAuthenticated && (
              <p className="text-sm text-gray-600 text-center">
                You'll need to sign in to submit your prompt
              </p>
            )}
          </form>
        </CardContent>
      </Card>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default PromptForm;