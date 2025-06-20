import React from 'react';
import { Button } from '@/components/ui/button';

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  totalItems?: number;
  onPrev: () => void;
  onNext: () => void;
  label?: string;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  page,
  totalPages,
  totalItems,
  onPrev,
  onNext,
  label,
}) => (
  <div className="flex justify-between items-center mt-4">
    <span className="text-sm text-gray-600">
      {label ? `${label} | ` : ''}
      Page {page} of {totalPages}
      {typeof totalItems === 'number' ? ` | Total: ${totalItems}` : ''}
    </span>
    <div className="space-x-2">
      <Button variant="outline" size="sm" onClick={onPrev} disabled={page === 1}>
        Previous
      </Button>
      <Button variant="outline" size="sm" onClick={onNext} disabled={page === totalPages}>
        Next
      </Button>
    </div>
  </div>
);

export default PaginationControls;