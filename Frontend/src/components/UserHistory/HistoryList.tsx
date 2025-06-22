import React from 'react';
import Filters from '@/components/common/Filters';
import HistoryItemsList from './HistoryItemsList';
import PaginationControls from '../common/PaginationControls';
import { useHistoryList } from '../../hooks/useHistroyList';
import HistoryListHeader from './HistoryListHeader';
import HistoryListEmptyState from './HistoryListEmptyState';

const HistoryList: React.FC = () => {
  const {
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
  } = useHistoryList();

  return (
    <div className="space-y-6">
      <Filters filterKey="history" searchPlaceholder="Search history..." />
      <HistoryListHeader total={total} />
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : history.length === 0 ? (
        <HistoryListEmptyState />
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