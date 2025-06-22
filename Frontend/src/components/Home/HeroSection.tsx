import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Brain, Sparkles, ArrowRight } from 'lucide-react';
import { useAppSelector } from '@/app/hooks';

const HeroSection: React.FC = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-blue-600 rounded-full">
              <Brain className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Learn Anything with
            <span className="text-blue-600 block">AI-Powered Lessons</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get personalized, interactive lessons on any topic. Our AI adapts to your learning style, 
            pace, and goals to create the perfect educational experience just for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/lessons">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                <Sparkles className="h-5 w-5 mr-2" />
                Start Learning
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            {!isAuthenticated && (
              <Link to="/register">
                <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                  Create Free Account
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;