import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, User, ArrowLeft } from 'lucide-react';
import PromptForm from '../components/PromptSubmission/PromptForm/PromptForm';
import { PromptHistory } from '../types';

const Lessons: React.FC = () => {
  const [currentLesson, setCurrentLesson] = useState<PromptHistory | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');

  const handleLessonGenerated = (lesson: PromptHistory) => {
    setCurrentLesson(lesson);
  };

  const handleBackToForm = () => {
    setCurrentLesson(null);
  };

  const handlePromptGenerated = (prompt: string) => {
    setGeneratedPrompt(prompt);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {!currentLesson ? (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                AI Learning Studio
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Create personalized lessons on any topic with the help of our AI assistant. 
                Get instant, comprehensive content tailored to your learning needs.
              </p>
            </div>

            <PromptForm 
              onLessonGenerated={handleLessonGenerated} 
              initialPrompt={generatedPrompt}
            />

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <Card className="text-center">
                <CardHeader>
                  <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">Comprehensive Lessons</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Get detailed, well-structured lessons with examples and explanations
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">Instant Generation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Receive your personalized lesson in seconds, available 24/7
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <User className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">Personalized Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Content adapted to your level, goals, and learning preferences
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Lesson Header */}
            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={handleBackToForm} className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Create New Lesson
              </Button>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {formatDate(currentLesson.createdAt)}
                </div>
                <Badge variant="outline">{currentLesson.category?.name}</Badge>
                <Badge variant="secondary">{currentLesson.subCategory?.name}</Badge>
              </div>
            </div>

            {/* Lesson Content */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Your AI-Generated Lesson</CardTitle>
                <CardDescription className="text-base">
                  <strong>Your Request:</strong> {currentLesson.prompt}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="prose prose-lg max-w-none">
                  <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                    {currentLesson.response}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lesson Actions */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={handleBackToForm} className="flex-1">
                    Create Another Lesson
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => window.location.href = '/history'}
                    className="flex-1"
                  >
                    View Learning History
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lessons;