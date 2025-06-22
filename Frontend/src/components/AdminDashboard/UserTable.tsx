import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import UserTableRow from './UserTableRow';
import PaginationControls from '../common/PaginationControls';
import { useUserTable } from '@/hooks/useUserTable';

const UserTable: React.FC = () => {
  const {
    users,
    search,
    isLoading,
    page,
    totalPages,
    total,
    handleSearchChange,
    handlePrev,
    handleNext,
    formatDate,
  } = useUserTable();

  return (
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
              value={search}
              onChange={handleSearchChange}
              className="max-w-xs"
            />
          </div>
        </div>
        {isLoading ? (
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
                {users.map((user) => (
                  <UserTableRow key={user.id} user={user} formatDate={formatDate} />
                ))}
              </TableBody>
            </Table>
            {users.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No users found.
              </div>
            )}
            <PaginationControls
              page={page}
              totalPages={totalPages}
              totalItems={total}
              onPrev={handlePrev}
              onNext={handleNext}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default UserTable;