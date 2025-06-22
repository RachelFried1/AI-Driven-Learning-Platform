import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface LessonActionsProps {
  onBack: () => void;
}

const LessonActions: React.FC<LessonActionsProps> = ({ onBack }) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={onBack} className="flex-1">
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
);

export default LessonActions;