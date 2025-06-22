import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import ReactMarkdown from 'react-markdown';

interface PromptLessonModalProps {
  open: boolean;
  onClose: () => void;
  lessonMarkdown: string;
}

const PromptLessonModal: React.FC<PromptLessonModalProps> = ({
  open,
  onClose,
  lessonMarkdown,
}) => {
  if (!lessonMarkdown) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl w-full p-0">
        <DialogHeader className="flex flex-row justify-between items-center px-6 pt-6 pb-2">
          <DialogTitle className="text-xl font-bold">Lesson</DialogTitle>
        </DialogHeader>
        <div
          className="prose prose-lg max-w-none text-gray-900 px-6 pb-6 overflow-y-auto"
          style={{ maxHeight: '70vh' }}
        >
          <ReactMarkdown>{lessonMarkdown}</ReactMarkdown>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PromptLessonModal;