import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock } from 'lucide-react';
import { PromptHistory } from '../../types';

interface LessonHeaderBarProps {
  lesson: PromptHistory;
  onBack: () => void;
  formatDate: (dateString: string) => string;
}

const LessonHeaderBar: React.FC<LessonHeaderBarProps> = ({ lesson, onBack, formatDate }) => (
  <div className="flex items-center justify-between">
    <Button variant="outline" onClick={onBack} className="flex items-center">
      <ArrowLeft className="h-4 w-4 mr-2" />
      Create New Lesson
    </Button>
    <div className="flex items-center space-x-4 text-sm text-gray-600">
      <div className="flex items-center">
        <Clock className="h-4 w-4 mr-1" />
        {formatDate(lesson.createdAt)}
      </div>
      <Badge variant="outline">{lesson.category?.name}</Badge>
      <Badge variant="secondary">{lesson.subCategory?.name}</Badge>
    </div>
  </div>
);

export default LessonHeaderBar;