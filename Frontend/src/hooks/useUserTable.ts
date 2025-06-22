import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { fetchUsers, setPage, setSearch } from '@/features/users/usersSlice';

export function useUserTable() {
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
    dispatch(setPage(1));
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

  const filteredUsers = users.filter(user => user.role !== 'admin');

  return {
    users: filteredUsers,
    search,
    isLoading,
    page,
    totalPages,
    total,
    handleSearchChange,
    handlePrev,
    handleNext,
    formatDate,
  };
}