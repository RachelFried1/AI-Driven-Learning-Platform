import React from 'react';
import FeatureCard from './FeatureCard';
import { Bot, Target, Zap } from 'lucide-react';

const FeaturesSection: React.FC = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Why Choose AI Learn?
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Experience the future of education with our intelligent learning platform
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          icon={<Bot className="h-6 w-6 text-blue-600" />}
          title="AI-Powered Personalization"
          description="Our intelligent assistant analyzes your learning preferences and creates lessons tailored specifically to your needs and skill level."
          bgColor="bg-blue-100"
        />
        <FeatureCard
          icon={<Target className="h-6 w-6 text-green-600" />}
          title="Guided Learning Path"
          description="Get step-by-step guidance with our smart chatbot that helps you formulate the perfect learning request for maximum effectiveness."
          bgColor="bg-green-100"
        />
        <FeatureCard
          icon={<Zap className="h-6 w-6 text-purple-600" />}
          title="Instant Learning"
          description="Get comprehensive lessons in seconds. No waiting, no scheduling - learn what you want, when you want, at your own pace."
          bgColor="bg-purple-100"
        />
      </div>
    </div>
  </section>
);

export default FeaturesSection;