import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface UserTableRowProps {
  user: any;
  formatDate: (dateString: string) => string;
}

const UserTableRow: React.FC<UserTableRowProps> = ({ user, formatDate }) => (
  <TableRow>
    <TableCell>{user.id}</TableCell>
    <TableCell>{user.name}</TableCell>
    <TableCell>{user.email}</TableCell>
    <TableCell>
      <Badge variant={user.role === 'admin' ? 'secondary' : 'outline'}>
        {user.role}
      </Badge>
    </TableCell>
    <TableCell>{formatDate(user.createdAt)}</TableCell>
  </TableRow>
);

export default UserTableRow;