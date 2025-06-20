import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PromptHistory } from '../../types';

interface PromptTableRowProps {
  item: PromptHistory;
  formatDate: (dateString: string) => string;
  onView: (item: PromptHistory) => void;
}

const PromptTableRow: React.FC<PromptTableRowProps> = ({ item, formatDate, onView }) => (
  <TableRow>
    <TableCell className="font-medium">
      {item.user?.name || 'Unknown User'}
    </TableCell>
    <TableCell className="max-w-md">
      <div className="truncate" title={item.prompt}>
        {item.prompt}
      </div>
    </TableCell>
    <TableCell>
      <Badge variant="outline">{item.category?.name}</Badge>
    </TableCell>
    <TableCell>
      <Badge variant="secondary">{item.subCategory?.name}</Badge>
    </TableCell>
    <TableCell className="text-sm text-gray-600">
      {formatDate(item.createdAt)}
    </TableCell>
    <TableCell>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onView(item)}
      >
        View
      </Button>
    </TableCell>
  </TableRow>
);

export default PromptTableRow;