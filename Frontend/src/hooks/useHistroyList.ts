import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { fetchHistory, setPage } from '@/features/history/historySlice';

export function useHistoryList() {
  const {
    items: history,
    isLoading,
    page,
    totalPages,
    total,
    limit,
  } = useAppSelector((state) => state.history);

  const { searchTerm, categoryId, subCategoryId, date } = useAppSelector(
    (state) => state.filters.history
  );

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

  useEffect(() => {
    dispatch(setPage(1));
  }, [searchTerm, categoryId, subCategoryId, date, dispatch]);

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) => {
      const newExpanded = new Set(prev);
      newExpanded.has(id) ? newExpanded.delete(id) : newExpanded.add(id);
      return newExpanded;
    });
  };

  const handlePrev = () => {
    if (page > 1) dispatch(setPage(page - 1));
  };
  const handleNext = () => {
    if (page < totalPages) dispatch(setPage(page + 1));
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

  return {
    history,
    isLoading,
    page,
    totalPages,
    total,
    expandedItems,
    toggleExpanded,
    handlePrev,
    handleNext,
    formatDate,
  };
}