import React from 'react';

interface HowItWorksStepProps {
  step: string;
  title: string;
  description: string;
}

const HowItWorksStep: React.FC<HowItWorksStepProps> = ({ step, title, description }) => (
  <div className="text-center">
    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
      {step}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default HowItWorksStep;