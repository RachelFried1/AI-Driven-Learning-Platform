import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { PromptHistory } from '../../types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface PromptDetailsModalProps {
  open: boolean;
  onClose: () => void;
  prompt?: PromptHistory | null;
}

const PromptDetailsModal: React.FC<PromptDetailsModalProps> = ({ open, onClose, prompt }) => {
  if (!prompt) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Prompt Details</DialogTitle>
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
        <div className="mb-2">
          <Badge variant="outline">{prompt.category?.name}</Badge>
          <Badge variant="secondary" className="ml-2">{prompt.subCategory?.name}</Badge>
        </div>
        <div className="mb-4">
          <strong>Lesson:</strong>
          <div className="whitespace-pre-wrap mt-1 text-gray-800">{prompt.response}</div>
        </div>
        <DialogClose asChild>
          <Button variant="outline">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default PromptDetailsModal;