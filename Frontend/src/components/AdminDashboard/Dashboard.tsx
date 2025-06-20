import React, { useState } from 'react';
import DashboardFilters from './DashboardFilters';
import UserTable from './UserTable';
import PromptTable from './PromptTable';
import PromptDetailsModal from './PromptDetailsModal';
import { Button } from '@/components/ui/button';
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
      <div className="flex gap-4">
        <Button
          variant={!showUsers ? "default" : "outline"}
          onClick={() => setShowUsers(false)}
        >
          Prompt History
        </Button>
        <Button
          variant={showUsers ? "default" : "outline"}
          onClick={() => setShowUsers(true)}
        >
          List All Users
        </Button>
      </div>

      {!showUsers && (
        <>
          <DashboardFilters />
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

      {showUsers && (
        <UserTable />
      )}
    </div>
  );
};

export default Dashboard;