import React from 'react';
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  showUsers: boolean;
  onShowUsers: (show: boolean) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ showUsers, onShowUsers }) => (
  <div className="flex gap-4">
    <Button
      variant={!showUsers ? "default" : "outline"}
      onClick={() => onShowUsers(false)}
    >
      Prompt History
    </Button>
    <Button
      variant={showUsers ? "default" : "outline"}
      onClick={() => onShowUsers(true)}
    >
      List All Users
    </Button>
  </div>
);

export default DashboardHeader;