import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import HistoryFilters from './HistoryFilters';
import HistoryItemsList from './HistoryItemsList';
import PaginationControls from '../common/PaginationControls';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { fetchHistory, setPage } from '@/features/history/historySlice';

const HistoryList: React.FC = () => {
  const {
    items: history,
    isLoading,
    page,
    totalPages,
    total,
    limit,
  } = useAppSelector((state) => state.history);

  // ✅ Call selectors at the top level
  const searchTerm = useAppSelector((state) => state.filters.history.searchTerm);
  const categoryId = useAppSelector((state) => state.filters.history.categoryId);
  const subCategoryId = useAppSelector((state) => state.filters.history.subCategoryId);
  const date = useAppSelector((state) => state.filters.history.date);

  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fetchHistory({
        page,
        limit,
        search: searchTerm,
        categoryId,
        subCategoryId,
        date,
      })
    );
  }, [dispatch, page, limit, searchTerm, categoryId, subCategoryId, date]);

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handlePrev = () => {
    if (page > 1) dispatch(setPage(page - 1));
  };
  const handleNext = () => {
    if (page < totalPages) dispatch(setPage(page + 1));
  };

  useEffect(() => {
    dispatch(setPage(1));
  }, [searchTerm, categoryId, subCategoryId, date, dispatch]);

  return (
    <div className="space-y-6">
      <HistoryFilters />
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Your Learning History</h2>
        <Badge variant="secondary" className="text-sm">
          {total} lesson{total !== 1 ? 's' : ''}
        </Badge>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : history.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No lessons yet</h3>
            <p className="text-gray-600 mb-4">
              Start your learning journey by creating your first AI lesson!
            </p>
            <Button onClick={() => window.location.href = '/lessons'}>
              Create Your First Lesson
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <HistoryItemsList
            history={history}
            expandedItems={expandedItems}
            toggleExpanded={toggleExpanded}
            formatDate={formatDate}
          />
          <PaginationControls
            page={page}
            totalPages={totalPages}
            totalItems={total}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        </>
      )}
    </div>
  );
};

export default HistoryList;