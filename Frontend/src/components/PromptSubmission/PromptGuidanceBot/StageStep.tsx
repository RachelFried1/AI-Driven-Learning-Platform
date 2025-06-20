import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StageStepProps {
  value: string;
  onChange: (value: string) => void;
}

const StageStep: React.FC<StageStepProps> = ({ value, onChange }) => (
  <div className="space-y-4">
    <Label>Learning Stage</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select your level" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="beginner">Complete Beginner</SelectItem>
        <SelectItem value="novice">Some Knowledge</SelectItem>
        <SelectItem value="intermediate">Intermediate</SelectItem>
        <SelectItem value="advanced">Advanced</SelectItem>
        <SelectItem value="expert">Expert Level</SelectItem>
      </SelectContent>
    </Select>
  </div>
);

export default StageStep;