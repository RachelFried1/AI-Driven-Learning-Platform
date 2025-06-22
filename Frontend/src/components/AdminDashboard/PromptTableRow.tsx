import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import ViewLessonButton from './ViewLessonButton';

interface PromptTableRowProps {
  item: any;
  formatDate: (dateString: string) => string;
}

const PromptTableRow: React.FC<PromptTableRowProps> = ({ item, formatDate }) => (
  <TableRow>
    <TableCell>{item.user?.name || 'Unknown'}</TableCell>
    <TableCell className="max-w-xs truncate">{item.prompt}</TableCell>
    <TableCell>
      <Badge variant="outline">{item.category?.name}</Badge>
    </TableCell>
    <TableCell>
      <Badge variant="outline">{item.subCategory?.name}</Badge>
    </TableCell>
    <TableCell>{formatDate(item.createdAt)}</TableCell>
    <TableCell>
      <ViewLessonButton lessonMarkdown={item.response} />
    </TableCell>
  </TableRow>
);

export default PromptTableRow;