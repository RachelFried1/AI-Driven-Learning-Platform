import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { PromptHistory } from '../../types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';

interface PromptDetailsModalProps {
  open: boolean;
  onClose: () => void;
  prompt?: PromptHistory | null;
}

const PromptDetailsModal: React.FC<PromptDetailsModalProps> = ({ open, onClose, prompt }) => {
  if (!prompt) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Prompt Details</DialogTitle>
          <DialogDescription>
            Detailed information about this prompt and its AI-generated lesson.
          </DialogDescription>
        </DialogHeader>
        <div className="mb-2">
          <strong>User:</strong> {prompt.user?.name || 'Unknown User'}
        </div>
        <div className="mb-2">
          <strong>Prompt:</strong> {prompt.prompt}
        </div>
        <div className="mb-2 flex flex-wrap gap-2">
          <Badge variant="outline">{prompt.category?.name}</Badge>
          <Badge variant="secondary">{prompt.subCategory?.name}</Badge>
        </div>
        <div className="mb-4">
          <strong>Lesson:</strong>
          <div className="prose prose-lg max-w-none mt-2 text-gray-900">
            <ReactMarkdown>{prompt.response}</ReactMarkdown>
          </div>
        </div>
        <DialogClose asChild>
          <Button variant="outline">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default PromptDetailsModal;