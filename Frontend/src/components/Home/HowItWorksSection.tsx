import React from 'react';
import HowItWorksStep from './HowItWorksStep';

const steps = [
  {
    step: "1",
    title: "Choose Your Topic",
    description: "Select from our comprehensive categories covering Mathematics, Science, Programming, and more."
  },
  {
    step: "2",
    title: "Get AI Guidance",
    description: "Our smart assistant helps you craft the perfect learning request with targeted questions."
  },
  {
    step: "3",
    title: "Receive Your Lesson",
    description: "Get a personalized, comprehensive lesson generated instantly by our AI."
  },
  {
    step: "4",
    title: "Track Progress",
    description: "Review your learning history and continue building on your knowledge."
  }
];

const HowItWorksSection: React.FC = () => (
  <section className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          How It Works
        </h2>
        <p className="text-xl text-gray-600">
          Simple steps to unlock your learning potential
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {steps.map((item, index) => (
          <HowItWorksStep
            key={index}
            step={item.step}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;