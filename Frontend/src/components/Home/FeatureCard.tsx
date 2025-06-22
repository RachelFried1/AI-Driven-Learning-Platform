import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, bgColor }) => (
  <Card className="text-center hover:shadow-lg transition-shadow">
    <CardHeader>
      <div className={`mx-auto w-12 h-12 ${bgColor} rounded-full flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription>{description}</CardDescription>
    </CardContent>
  </Card>
);

export default FeatureCard;