import React, { useState } from 'react';
import DashboardHeader from './DashboardHeader';
import Filters from '@/components/common/Filters';
import PromptTable from './PromptTable';
import PromptDetailsModal from './PromptDetailsModal';
import UserTable from './UserTable';
import { PromptHistory } from '../../types';

const Dashboard: React.FC = () => {
  const [showUsers, setShowUsers] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<PromptHistory | null>(null);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);

  const handleViewPrompt = (item: PromptHistory) => {
    setSelectedPrompt(item);
    setIsPromptModalOpen(true);
  };

  const handleClosePromptModal = () => {
    setIsPromptModalOpen(false);
    setSelectedPrompt(null);
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

  return (
    <div className="space-y-6">
      <DashboardHeader showUsers={showUsers} onShowUsers={setShowUsers} />

      {!showUsers && (
        <>
          <Filters filterKey="admin" searchPlaceholder="Search prompts..." />
          <PromptTable
            onView={handleViewPrompt}
            formatDate={formatDate}
          />
          <PromptDetailsModal
            open={isPromptModalOpen}
            onClose={handleClosePromptModal}
            prompt={selectedPrompt}
          />
        </>
      )}

      {showUsers && <UserTable />}
    </div>
  );
};

export default Dashboard;