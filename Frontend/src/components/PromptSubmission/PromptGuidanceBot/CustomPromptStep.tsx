import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface CustomPromptStepProps {
  value: string;
  onChange: (value: string) => void;
  subcategoryName: string;
}

const CustomPromptStep: React.FC<CustomPromptStepProps> = ({ value, onChange, subcategoryName }) => (
  <div className="space-y-4">
    <Label htmlFor="prompt">What would you like to learn about?</Label>
    <Input
      id="prompt"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={`e.g., "Explain ${subcategoryName} with practical examples"`}
      className="min-h-[100px]"
    />
  </div>
);

export default CustomPromptStep;