import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface PromptTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  initialPrompt?: string;
  showAssistantBanner?: boolean;
}

const PromptTextarea: React.FC<PromptTextareaProps> = ({
  value,
  onChange,
  initialPrompt,
  showAssistantBanner = false,
}) => (
  <div className="space-y-2">
    <Label htmlFor="prompt">Your Learning Request</Label>
    <Textarea
      id="prompt"
      value={value}
      onChange={onChange}
      placeholder="Describe what you want to learn. Be specific about your level, goals, and any particular aspects you're interested in..."
      className="min-h-[120px]"
      required
    />
  </div>
);

export default PromptTextarea;