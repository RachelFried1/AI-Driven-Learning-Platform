import React, { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import UserTableRow from './UserTableRow';
import PaginationControls from '../common/PaginationControls';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { fetchUsers, setPage, setSearch } from '@/features/users/usersSlice';

const UserTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    items: users,
    search,
    isLoading,
    page,
    totalPages,
    total,
  } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers({ page, limit: 10, search }));
  }, [dispatch, page, search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
    dispatch(setPage(1)); // Reset to first page on search
  };

  const handlePrev = () => {
    if (page > 1) dispatch(setPage(page - 1));
  };

  const handleNext = () => {
    if (page < totalPages) dispatch(setPage(page + 1));
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
                {users
                  .filter(user => user.role !== 'admin')
                  .map((user) => (
                    <UserTableRow key={user.id} user={user} formatDate={formatDate} />
                  ))}
              </TableBody>
            </Table>
            {users.filter(user => user.role !== 'admin').length === 0 && (
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