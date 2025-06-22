import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BookOpen, Clock, User } from 'lucide-react';

const LessonsQuickStats: React.FC = () => (
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
);

export default LessonsQuickStats;