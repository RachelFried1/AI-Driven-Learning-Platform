import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import HistoryList from '../components/UserHistory/HistoryList';
import { useAppSelector } from '@/app/hooks';

const History: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {user?.role === 'admin' && (
          <div className="bg-yellow-100 text-yellow-800 p-2 text-center font-semibold mb-4">
            Admin preview mode — you are viewing user features for testing purposes.
          </div>
        )}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <Link to="/lessons">
              <Button variant="outline" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Lessons
              </Button>
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Your Learning Journey
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Review all your AI-generated lessons and track your learning progress across different topics.
            </p>
          </div>
        </div>
        <HistoryList />
      </div>
    </div>
  );
};

export default History;