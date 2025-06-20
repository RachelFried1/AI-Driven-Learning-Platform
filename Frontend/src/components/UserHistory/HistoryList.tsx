import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import { promptService } from '../../services/prompt';
import { Category, Subcategory, PromptHistory } from '../../types';
import { toast } from '@/hooks/use-toast';
import HistoryFilters from './HistoryFilters';
import HistoryItemsList from './HistoryItemsList';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { setFilterField, FilterKey } from '@/features/filters/filtersSlice';

const filterKey: FilterKey = 'user';

const HistoryList: React.FC = () => {
  const [history, setHistory] = useState<PromptHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Pagination and filter state
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

  // Redux filter state
  const dispatch = useAppDispatch();
  const { searchTerm, categoryId, subCategoryId, date } = useAppSelector(
    (state) => state.filters[filterKey]
  );

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (categoryId) {
      promptService.getSubcategories(categoryId).then(setSubcategories);
    } else {
      setSubcategories([]);
    }
    dispatch(setFilterField({ key: filterKey, field: 'subCategoryId', value: '' }));
    // eslint-disable-next-line
  }, [categoryId]);

  useEffect(() => {
    loadHistory();
    // eslint-disable-next-line
  }, [page, limit, searchTerm, categoryId, subCategoryId, date]);

  const loadCategories = async () => {
    try {
      const data = await promptService.getCategories();
      setCategories(data);
    } catch {
      setCategories([]);
    }
  };

  const loadHistory = async () => {
    setIsLoading(true);
    try {
      const res = await promptService.getUserPrompts({
        page,
        limit,
        search: searchTerm,
        categoryId,
        subCategoryId,
        date,
      });
      setHistory(res.items);
      setTotalPages(res.totalPages);
      setTotalItems(res.totalItems);
    } catch (error) {
      toast({ title: "Failed to load history", variant: "destructive" });
      setHistory([]);
      setTotalPages(1);
      setTotalItems(0);
    } finally {
      setIsLoading(false);
    }
  };

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

  // Pagination controls
  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [searchTerm, categoryId, subCategoryId, date]);

  // Redux filter handlers
  const handleSetSearchTerm = (v: string) =>
    dispatch(setFilterField({ key: filterKey, field: 'searchTerm', value: v }));
  const handleSetCategoryId = (v: string) =>
    dispatch(setFilterField({ key: filterKey, field: 'categoryId', value: v }));
  const handleSetSubCategoryId = (v: string) =>
    dispatch(setFilterField({ key: filterKey, field: 'subCategoryId', value: v }));
  const handleSetDate = (v: string) =>
    dispatch(setFilterField({ key: filterKey, field: 'date', value: v }));

  return (
    <div className="space-y-6">
      {/* Filter Inputs */}
      <HistoryFilters
        searchTerm={searchTerm}
        setSearchTerm={handleSetSearchTerm}
        categoryId={categoryId}
        setCategoryId={handleSetCategoryId}
        subCategoryId={subCategoryId}
        setSubCategoryId={handleSetSubCategoryId}
        date={date}
        setDate={handleSetDate}
        categories={categories}
        subcategories={subcategories}
      />

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Your Learning History</h2>
        <Badge variant="secondary" className="text-sm">
          {totalItems} lesson{totalItems !== 1 ? 's' : ''}
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
    </div>
  );
};

export default HistoryList;