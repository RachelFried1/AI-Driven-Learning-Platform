
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Clock, BookOpen } from 'lucide-react';
import { promptService } from '../../services/prompt';
import { PromptHistory } from '../../types';
import { toast } from '@/hooks/use-toast';

const HistoryList: React.FC = () => {
  const [history, setHistory] = useState<PromptHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await promptService.getUserHistory();
      setHistory(data);
    } catch (error) {
      console.error('Failed to load history:', error);
      // Mock data for demo
      const mockHistory: PromptHistory[] = [
        {
          id: '1',
          prompt: 'Explain quadratic equations for high school students',
          response: 'A quadratic equation is a polynomial equation of degree 2...',
          category: 'Mathematics',
          subcategory: 'Algebra',
          createdAt: '2024-01-15T10:30:00Z',
          userId: 'user1',
        },
        {
          id: '2',
          prompt: 'Teach me React components with examples',
          response: 'React components are the building blocks of React applications...',
          category: 'Programming',
          subcategory: 'Web Development',
          createdAt: '2024-01-14T15:45:00Z',
          userId: 'user1',
        },
      ];
      setHistory(mockHistory);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No lessons yet</h3>
          <p className="text-gray-600 mb-4">
            Start your learning journey by creating your first AI lesson!
          </p>
          <Button onClick={() => window.location.href = '/lessons'}>
            Create Your First Lesson
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Your Learning History</h2>
        <Badge variant="secondary" className="text-sm">
          {history.length} lesson{history.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      {history.map((item) => (
        <Card key={item.id} className="transition-shadow hover:shadow-md">
          <Collapsible>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2 line-clamp-2">
                      {item.prompt}
                    </CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {formatDate(item.createdAt)}
                      </div>
                      <Badge variant="outline">{item.category}</Badge>
                      <Badge variant="outline">{item.subcategory}</Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    {expandedItems.has(item.id) ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3 text-gray-900">AI Response:</h4>
                  <div className="prose prose-sm max-w-none">
                    <p className="whitespace-pre-wrap text-gray-700">
                      {item.response}
                    </p>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      ))}
    </div>
  );
};

export default HistoryList;
