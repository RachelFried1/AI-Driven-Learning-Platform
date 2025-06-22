import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Send } from 'lucide-react';
import PromptGuidanceBot from '../PromptGuidanceBot/PromptGuidanceBot';
import AuthModal from '../../Auth/AuthModal';
import CategorySelector from './CategorySelector';
import SubcategorySelector from './SubcategorySelector';
import PromptTextarea from './PromptTextarea';
import GuidanceBotBanner from './GuidanceBotBanner';
import { usePromptForm } from '@/hooks/usePromptForm';

interface PromptFormProps {
  onLessonGenerated: (lesson: any) => void;
  initialPrompt?: string;
  setPrompt: (prompt: string) => void;
}

const PromptForm: React.FC<PromptFormProps> = (props) => {
  const {
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
  } = usePromptForm(props);

  if (showGuidanceBot) {
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
              <CategorySelector value={selectedCategory} onChange={handleCategoryChange} />
              <SubcategorySelector
                categoryId={selectedCategory}
                value={selectedSubcategory}
                onChange={handleSubcategoryChange}
              />
            </div>
            {selectedCategory && selectedSubcategory && (
              <GuidanceBotBanner onClick={() => setShowGuidanceBot(true)} />
            )}
            <PromptTextarea
              value={prompt}
              onChange={handlePromptChange}
              initialPrompt={props.initialPrompt}
              showAssistantBanner={false}
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