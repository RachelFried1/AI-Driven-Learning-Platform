import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HistoryListEmptyState: React.FC = () => (
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

export default HistoryListEmptyState;