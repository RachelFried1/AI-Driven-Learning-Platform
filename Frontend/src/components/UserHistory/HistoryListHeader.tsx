import React from 'react';
import { Badge } from '@/components/ui/badge';

interface HistoryListHeaderProps {
  total: number;
}

const HistoryListHeader: React.FC<HistoryListHeaderProps> = ({ total }) => (
  <div className="flex items-center justify-between">
    <h2 className="text-2xl font-bold text-gray-900">Your Learning History</h2>
    <Badge variant="secondary" className="text-sm">
      {total} lesson{total !== 1 ? 's' : ''}
    </Badge>
  </div>
);

export default HistoryListHeader;