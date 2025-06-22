import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import PromptLessonModal from './PromptLessonModal';
import { Eye } from 'lucide-react';

interface ViewLessonButtonProps {
  lessonMarkdown: string;
  buttonLabel?: string;
}

const ViewLessonButton: React.FC<ViewLessonButtonProps> = ({ lessonMarkdown, buttonLabel = "View" }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="flex items-center gap-1"
      >
        <Eye className="h-4 w-4" />
        {buttonLabel}
      </Button>
      <PromptLessonModal
        open={open}
        onClose={() => setOpen(false)}
        lessonMarkdown={lessonMarkdown}
      />
    </>
  );
};

export default ViewLessonButton;