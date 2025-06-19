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
      // Convert selectedCategory to number for backend compatibility
      loadSubcategories(selectedCategory);
    }
  }, [selectedCategory]);

  const loadCategories = async () => {
    try {
      const data = await promptService.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Failed to load categories:', error);
      // Mock data for demo
      setCategories([
        { id: '1', name: 'Mathematics', description: 'Algebra, Geometry, Calculus' },
        { id: '2', name: 'Science', description: 'Physics, Chemistry, Biology' },
        { id: '3', name: 'Programming', description: 'Web Dev, Mobile Dev, Data Science' },
        { id: '4', name: 'Language Arts', description: 'Writing, Literature, Grammar' },
      ]);
    }
  };

  const loadSubcategories = async (categoryId: string) => {
    try {
      // Convert categoryId to number for backend if needed
      const data = await promptService.getSubcategories(Number(categoryId));
      setSubcategories(data);
    } catch (error) {
      console.error('Failed to load subcategories:', error);
      // Mock data for demo
      const mockSubcategories: { [key: string]: Subcategory[] } = {
        '1': [
          { id: '1-1', categoryId: '1', name: 'Algebra', description: 'Linear equations, polynomials' },
          { id: '1-2', categoryId: '1', name: 'Geometry', description: 'Shapes, angles, proofs' },
          { id: '1-3', categoryId: '1', name: 'Calculus', description: 'Derivatives, integrals' },
        ],
        '2': [
          { id: '2-1', categoryId: '2', name: 'Physics', description: 'Mechanics, thermodynamics' },
          { id: '2-2', categoryId: '2', name: 'Chemistry', description: 'Organic, inorganic chemistry' },
          { id: '2-3', categoryId: '2', name: 'Biology', description: 'Cell biology, genetics' },
        ],
        '3': [
          { id: '3-1', categoryId: '3', name: 'Web Development', description: 'HTML, CSS, JavaScript' },
          { id: '3-2', categoryId: '3', name: 'Mobile Development', description: 'iOS, Android apps' },
          { id: '3-3', categoryId: '3', name: 'Data Science', description: 'Python, machine learning' },
        ],
        '4': [
          { id: '4-1', categoryId: '4', name: 'Creative Writing', description: 'Fiction, poetry, essays' },
          { id: '4-2', categoryId: '4', name: 'Literature', description: 'Analysis, interpretation' },
          { id: '4-3', categoryId: '4', name: 'Grammar', description: 'Rules, punctuation, style' },
        ],
      };
      setSubcategories(mockSubcategories[categoryId] || []);
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

      // Reset form
      setPrompt('');
    } catch (error) {
      console.error('Failed to submit prompt:', error);
      // For demo, generate a mock response
      const mockResponse = {
        id: Date.now().toString(),
        prompt: prompt,
        response: `This is a comprehensive lesson about ${getSubcategoryName()} in ${getCategoryName()}.\n\n**Introduction:**\nWelcome to this lesson! Today we'll explore the fascinating world of ${getSubcategoryName()}.\n\n**Main Content:**\nLet's start with the fundamentals...\n\n**Key Points:**\n- Important concept 1\n- Important concept 2\n- Important concept 3\n\n**Summary:**\nIn this lesson, we covered the essential aspects of ${getSubcategoryName()}. Remember to practice these concepts regularly!\n\n**Next Steps:**\nContinue your learning journey with related topics in ${getCategoryName()}.`,
        category: getCategoryName(),
        subcategory: getSubcategoryName(),
        createdAt: new Date().toISOString(),
      };

      onLessonGenerated(mockResponse);
      setPrompt('');

      toast({
        title: "Lesson generated!",
        description: "Your AI lesson is ready (demo mode)",
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