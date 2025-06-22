import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface UserMenuProps {
  userName?: string;
  onLogout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ userName, onLogout }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="flex items-center space-x-2">
        <User className="h-4 w-4" />
        <span>{userName}</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem onClick={onLogout}>
        <LogOut className="h-4 w-4 mr-2" />
        Sign Out
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default UserMenu;