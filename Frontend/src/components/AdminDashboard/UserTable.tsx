import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface UserTableProps {
  users: any[];
  userSearch: string;
  setUserSearch: (v: string) => void;
  isLoadingUsers: boolean;
  userPage: number;
  userTotalPages: number;
  totalUsers: number;
  handleUserPrev: () => void;
  handleUserNext: () => void;
  formatDate: (dateString: string) => string;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  userSearch,
  setUserSearch,
  isLoadingUsers,
  userPage,
  userTotalPages,
  totalUsers,
  handleUserPrev,
  handleUserNext,
  formatDate,
}) => (
  <Card>
    <CardHeader>
      <CardTitle>All Users</CardTitle>
      <CardDescription>
        List of all registered users
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-4 items-end mb-4">
        <div>
          <label className="block text-xs mb-1">Search</label>
          <Input
            placeholder="Search by name or email..."
            value={userSearch}
            onChange={e => setUserSearch(e.target.value)}
            className="max-w-xs"
          />
        </div>
      </div>
      {isLoadingUsers ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users
                .filter(user => user.role !== 'admin')
                .map((user) => (
                  <TableRow key={user.id}>
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
                ))}
            </TableBody>
          </Table>
          {users.filter(user => user.role !== 'admin').length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No users found.
            </div>
          )}
          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-600">
              Page {userPage} of {userTotalPages} | Total: {totalUsers}
            </span>
            <div className="space-x-2">
              <Button variant="outline" size="sm" onClick={handleUserPrev} disabled={userPage === 1}>
                Previous
              </Button>
              <Button variant="outline" size="sm" onClick={handleUserNext} disabled={userPage === userTotalPages}>
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </CardContent>
  </Card>
);

export default UserTable;