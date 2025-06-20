import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PromptHistory } from '../../types';

interface PromptTableProps {
  items: PromptHistory[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  totalItems: number;
  handlePrev: () => void;
  handleNext: () => void;
  formatDate: (dateString: string) => string;
  onView: (item: PromptHistory) => void;
}

const PromptTable: React.FC<PromptTableProps> = ({
  items,
  isLoading,
  page,
  totalPages,
  totalItems,
  handlePrev,
  handleNext,
  formatDate,
  onView,
}) => (
  <Card>
    <CardHeader>
      <CardTitle>User Activity</CardTitle>
      <CardDescription>
        All user prompts and AI-generated lessons
      </CardDescription>
    </CardHeader>
    <CardContent>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Prompt</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Subcategory</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {item.user?.name  || 'Unknown User'}
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
                    <Badge variant="secondary">{item.subcategory?.name}</Badge>
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
              ))}
            </TableBody>
          </Table>
          {items.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No results found.
            </div>
          )}
          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-600">
              Page {page} of {totalPages} | Total: {totalItems}
            </span>
            <div className="space-x-2">
              <Button variant="outline" size="sm" onClick={handlePrev} disabled={page === 1}>
                Previous
              </Button>
              <Button variant="outline" size="sm" onClick={handleNext} disabled={page === totalPages}>
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </CardContent>
  </Card>
);

export default PromptTable;