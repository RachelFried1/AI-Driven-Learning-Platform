import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Bot, Sparkles, Send } from 'lucide-react';
import { promptService } from '../../services/prompt';
import { Category, Subcategory, PromptSubmission } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import PromptGuidanceBot from './PromptGuidanceBot';
import AuthModal from '../Auth/AuthModal';

interface PromptFormProps {
  onLessonGenerated: (lesson: any) => void;
  initialPrompt?: string;
}

const PromptForm: React.FC<PromptFormProps> = ({ onLessonGenerated, initialPrompt = '' }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [prompt, setPrompt] = useState(initialPrompt);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showGuidanceBot, setShowGuidanceBot] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      loadSubcategories(selectedCategory);
    }
  }, [selectedCategory]);

  const loadCategories = async () => {
    try {
      const data = await promptService.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Failed to load categories:', error);
      setCategories([]); // No mock data, just empty
    }
  };

  const loadSubcategories = async (categoryId: string) => {
    try {
      const data = await promptService.getSubcategories(categoryId);
      setSubcategories(data);
    } catch (error) {
      console.error('Failed to load subcategories:', error);
      setSubcategories([]); // No mock data, just empty
    }
  };

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

  const getCategoryName = () => categories.find(c => c.id.toString() === selectedCategory)?.name || '';
  const getSubcategoryName = () => subcategories.find(s => s.id.toString() === selectedSubcategory)?.name || '';

  const canUseGuidanceBot = selectedCategory && selectedSubcategory;

  if (showGuidanceBot) {
    return (
      <PromptGuidanceBot
        categoryName={getCategoryName()}
        subcategoryName={getSubcategoryName()}
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
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subcategory">Subcategory</Label>
                <Select
                  value={selectedSubcategory}
                  onValueChange={setSelectedSubcategory}
                  disabled={!selectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    {subcategories.map((subcategory) => (
                      <SelectItem key={subcategory.id} value={subcategory.id.toString()}>
                        {subcategory.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {canUseGuidanceBot && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Bot className="h-5 w-5 text-blue-600 mr-2" />
                    <div>
                      <p className="font-medium text-blue-900">Need help crafting your prompt?</p>
                      <p className="text-sm text-blue-700">Our AI assistant can guide you through creating the perfect lesson request</p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowGuidanceBot(true)}
                    className="border-blue-300 text-blue-700 hover:bg-blue-100"
                  >
                    <Bot className="h-4 w-4 mr-2" />
                    Get Help
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="prompt">Your Learning Request</Label>
              <Textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to learn. Be specific about your level, goals, and any particular aspects you're interested in..."
                className="min-h-[120px]"
                required
              />
              {initialPrompt && (
                <p className="text-sm text-blue-600">✨ This prompt was generated by your chat assistant!</p>
              )}
            </div>

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