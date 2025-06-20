import React, { useState, useEffect } from 'react';
import { promptService } from '../../services/prompt';
import { userService } from '../../services/user';
import { PromptHistory, Category, Subcategory } from '../../types';
import { toast } from '@/hooks/use-toast';
import DashboardFilters from './DashboardFilters';
import UserTable from './UserTable';
import PromptTable from './PromptTable';
import PromptDetailsModal from './PromptDetailsModal';
import { Button } from '@/components/ui/button';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { setFilterField, FilterKey } from '@/features/filters/filtersSlice';

const filterKey: FilterKey = 'admin';

const Dashboard: React.FC = () => {
  // Filters and pagination state
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [showUsers, setShowUsers] = useState(false);

  // Data state for prompts
  const [items, setItems] = useState<PromptHistory[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Data state for users
  const [users, setUsers] = useState<any[]>([]);
  const [userSearch, setUserSearch] = useState('');
  const [userPage, setUserPage] = useState(1);
  const [userTotalPages, setUserTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  // Modal state for prompt details
  const [selectedPrompt, setSelectedPrompt] = useState<PromptHistory | null>(null);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);

  // Redux filter state
  const dispatch = useAppDispatch();
  const { searchTerm, categoryId, subCategoryId, date } = useAppSelector(
    (state) => state.filters[filterKey]
  );

  // Load categories for filter dropdown
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await promptService.getCategories();
        setCategories(data);
      } catch {
        setCategories([]);
      }
    };
    loadCategories();
  }, []);

  // Load subcategories when category changes
  useEffect(() => {
    if (categoryId) {
      promptService.getSubcategories(categoryId).then(setSubcategories);
    } else {
      setSubcategories([]);
    }
    dispatch(setFilterField({ key: filterKey, field: 'subCategoryId', value: '' }));
    // eslint-disable-next-line
  }, [categoryId]);

  // Fetch prompt data with filters and pagination
  useEffect(() => {
    if (showUsers) return;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await promptService.getAllPrompts({
          page,
          limit,
          search: searchTerm,
          categoryId,
          subCategoryId,
          startDate: date || undefined,
          endDate: date || undefined,
        });
        setItems(res.items);
        setTotalPages(res.totalPages);
        setTotalItems(res.totalItems);
      } catch (error) {
        toast({ title: "Failed to load data", variant: "destructive" });
        setItems([]);
        setTotalPages(1);
        setTotalItems(0);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [page, limit, searchTerm, categoryId, subCategoryId, date, showUsers]);

  // Fetch all users with filtering and pagination
  useEffect(() => {
    if (!showUsers) return;
    const fetchUsers = async () => {
      setIsLoadingUsers(true);
      try {
        const res = await userService.getAllUsers({
          search: userSearch,
          page: userPage,
          limit,
        });
        setUsers(res.items);
        setTotalUsers(res.total);
        setUserTotalPages(res.totalPages);
      } catch {
        setUsers([]);
        setTotalUsers(0);
        setUserTotalPages(1);
        toast({ title: "Failed to load users", variant: "destructive" });
      } finally {
        setIsLoadingUsers(false);
      }
    };
    fetchUsers();
  }, [showUsers, userSearch, userPage, limit]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Pagination controls
  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));
  const handleUserPrev = () => setUserPage((p) => Math.max(1, p - 1));
  const handleUserNext = () => setUserPage((p) => Math.min(userTotalPages, p + 1));

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [searchTerm, categoryId, subCategoryId, date, showUsers]);

  useEffect(() => {
    setUserPage(1);
  }, [userSearch, showUsers]);

  // Handler for viewing a prompt (open modal)
  const handleViewPrompt = (item: PromptHistory) => {
    setSelectedPrompt(item);
    setIsPromptModalOpen(true);
  };

  const handleClosePromptModal = () => {
    setIsPromptModalOpen(false);
    setSelectedPrompt(null);
  };

  // Redux filter handlers
  const handleSetSearchTerm = (v: string) =>
    dispatch(setFilterField({ key: filterKey, field: 'searchTerm', value: v }));
  const handleSetCategoryId = (v: string) =>
    dispatch(setFilterField({ key: filterKey, field: 'categoryId', value: v }));
  const handleSetSubCategoryId = (v: string) =>
    dispatch(setFilterField({ key: filterKey, field: 'subCategoryId', value: v }));
  const handleSetDate = (v: string) =>
    dispatch(setFilterField({ key: filterKey, field: 'date', value: v }));

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
          {/* Filter Inputs */}
          <DashboardFilters
            searchTerm={searchTerm}
            setSearchTerm={handleSetSearchTerm}
            categoryId={categoryId}
            setCategoryId={handleSetCategoryId}
            subCategoryId={subCategoryId}
            setSubCategoryId={handleSetSubCategoryId}
            date={date}
            setDate={handleSetDate}
            categories={categories}
            subcategories={subcategories}
          />

          {/* Prompt Table */}
          <PromptTable
            items={items}
            isLoading={isLoading}
            page={page}
            totalPages={totalPages}
            totalItems={totalItems}
            handlePrev={handlePrev}
            handleNext={handleNext}
            formatDate={formatDate}
            onView={handleViewPrompt}
          />

          {/* Prompt Details Modal */}
          <PromptDetailsModal
            open={isPromptModalOpen}
            onClose={handleClosePromptModal}
            prompt={selectedPrompt}
          />
        </>
      )}

      {showUsers && (
        <UserTable
          users={users}
          userSearch={userSearch}
          setUserSearch={setUserSearch}
          isLoadingUsers={isLoadingUsers}
          userPage={userPage}
          userTotalPages={userTotalPages}
          totalUsers={totalUsers}
          handleUserPrev={handleUserPrev}
          handleUserNext={handleUserNext}
          formatDate={formatDate}
        />
      )}
    </div>
  );
};

export default Dashboard;