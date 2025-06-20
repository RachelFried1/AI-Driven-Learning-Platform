import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface PreferencesStepProps {
  reviewBasics: boolean;
  includeSummary: boolean;
  includeQuestions: boolean;
  includeFollowUp: boolean;
  onChange: (field: string, value: boolean) => void;
}

const PreferencesStep: React.FC<PreferencesStepProps> = ({
  reviewBasics,
  includeSummary,
  includeQuestions,
  includeFollowUp,
  onChange,
}) => (
  <div className="space-y-4">
    <div className="flex items-center space-x-2">
      <Checkbox
        id="review"
        checked={reviewBasics}
        onCheckedChange={(checked) => onChange('reviewBasics', !!checked)}
      />
      <Label htmlFor="review">Review the basics first</Label>
    </div>
    <div className="flex items-center space-x-2">
      <Checkbox
        id="summary"
        checked={includeSummary}
        onCheckedChange={(checked) => onChange('includeSummary', !!checked)}
      />
      <Label htmlFor="summary">Include a summary at the end</Label>
    </div>
    <div className="flex items-center space-x-2">
      <Checkbox
        id="questions"
        checked={includeQuestions}
        onCheckedChange={(checked) => onChange('includeQuestions', !!checked)}
      />
      <Label htmlFor="questions">Add review questions</Label>
    </div>
    <div className="flex items-center space-x-2">
      <Checkbox
        id="followup"
        checked={includeFollowUp}
        onCheckedChange={(checked) => onChange('includeFollowUp', !!checked)}
      />
      <Label htmlFor="followup">Suggest a follow-up lesson</Label>
    </div>
  </div>
);

export default PreferencesStep;