import React from 'react';
import HeroSection from '@/components/Home/HeroSection';
import FeaturesSection from '@/components/Home/FeaturesSection';
import HowItWorksSection from '@/components/Home/HowItWorksSection';
import CtaSection from '@/components/Home/CtaSection';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CtaSection />
    </div>
  );
};

export default Home;