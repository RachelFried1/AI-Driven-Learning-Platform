import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody } from '@/components/ui/table';
import PromptTableRow from './PromptTableRow';
import PaginationControls from '../common/PaginationControls';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { setPage } from '@/features/prompts/promptsSlice';
import { PromptHistory } from '../../types';

interface PromptTableProps {
  onView: (item: PromptHistory) => void;
  formatDate: (dateString: string) => string;
}

const PromptTable: React.FC<PromptTableProps> = ({ onView, formatDate }) => {
  const dispatch = useAppDispatch();
  const {
    items,
    isLoading,
    page,
    totalPages,
    total,
  } = useAppSelector((state) => state.prompts);

  const handlePrev = () => {
    if (page > 1) dispatch(setPage(page - 1));
  };

  const handleNext = () => {
    if (page < totalPages) dispatch(setPage(page + 1));
  };

  return (
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
                  <PromptTableRow
                    key={item.id}
                    item={item}
                    formatDate={formatDate}
                    onView={onView}
                  />
                ))}
              </TableBody>
            </Table>
            {items.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No results found.
              </div>
            )}
            <PaginationControls
              page={page}
              totalPages={totalPages}
              totalItems={total}
              onPrev={handlePrev}
              onNext={handleNext}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PromptTable;