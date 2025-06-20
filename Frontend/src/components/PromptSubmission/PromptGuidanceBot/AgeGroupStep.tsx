import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AgeGroupStepProps {
  value: string;
  onChange: (value: string) => void;
}

const AgeGroupStep: React.FC<AgeGroupStepProps> = ({ value, onChange }) => (
  <div className="space-y-4">
    <Label>Age Group</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select age group" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="elementary">Elementary (6-11 years)</SelectItem>
        <SelectItem value="middle">Middle School (12-14 years)</SelectItem>
        <SelectItem value="high">High School (15-18 years)</SelectItem>
        <SelectItem value="college">College (18+ years)</SelectItem>
        <SelectItem value="adult">Adult Learner</SelectItem>
      </SelectContent>
    </Select>
  </div>
);

export default AgeGroupStep;