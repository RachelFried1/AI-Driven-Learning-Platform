import React from 'react';
import HistoryItemCard from './HistoryItemCard';
import { PromptHistory } from '../../types';

interface HistoryItemsListProps {
  history: PromptHistory[];
  expandedItems: Set<string>;
  toggleExpanded: (id: string) => void;
  formatDate: (dateString: string) => string;
}

const HistoryItemsList: React.FC<HistoryItemsListProps> = ({
  history,
  expandedItems,
  toggleExpanded,
  formatDate,
}) => (
  <>
    {history.map((item) => (
      <HistoryItemCard
        key={item.id}
        item={item}
        expanded={expandedItems.has(item.id)}
        toggleExpanded={toggleExpanded}
        formatDate={formatDate}
      />
    ))}
  </>
);

export default HistoryItemsList;