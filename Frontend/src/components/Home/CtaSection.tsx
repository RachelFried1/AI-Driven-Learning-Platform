import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import { useAppSelector } from '@/app/hooks';

const CtaSection: React.FC = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <section className="py-20 bg-blue-600">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Transform Your Learning?
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Join thousands of learners who are already experiencing the power of AI-driven education
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/lessons">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              <BookOpen className="h-5 w-5 mr-2" />
              Explore Lessons
            </Button>
          </Link>
          {!isAuthenticated && (
            <Link to="/register">
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600">
                Get Started Free
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default CtaSection;