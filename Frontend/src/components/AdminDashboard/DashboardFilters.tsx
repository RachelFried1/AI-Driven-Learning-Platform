import React, { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { setFilterField, FilterKey } from '@/features/filters/filtersSlice';
import { fetchCategories, fetchSubcategories } from '@/features/categories/categoriesSlice';

const filterKey: FilterKey = 'admin';

const DashboardFilters: React.FC = () => {
  const dispatch = useAppDispatch();
  const { searchTerm, categoryId, subCategoryId, date } = useAppSelector(
    (state) => state.filters[filterKey]
  );
  const { categories, subcategories } = useAppSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchSubcategories(categoryId));
    }
  }, [dispatch, categoryId]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterField({ key: filterKey, field: 'searchTerm', value: e.target.value }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilterField({ key: filterKey, field: 'categoryId', value: e.target.value }));
  };

  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilterField({ key: filterKey, field: 'subCategoryId', value: e.target.value }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterField({ key: filterKey, field: 'date', value: e.target.value }));
  };

  return (
    <div className="flex flex-wrap gap-4 items-end mb-4">
      <div>
        <label className="block text-xs mb-1">Search</label>
        <Input
          placeholder="Search prompts..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="max-w-xs"
        />
      </div>
      <div>
        <label className="block text-xs mb-1">Category</label>
        <select
          value={categoryId}
          onChange={handleCategoryChange}
          className="border rounded px-2 py-1"
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs mb-1">Subcategory</label>
        <select
          value={subCategoryId}
          onChange={handleSubCategoryChange}
          className="border rounded px-2 py-1"
        >
          <option value="">All</option>
          {(subcategories[categoryId] || []).map((sub) => (
            <option key={sub.id} value={sub.id}>{sub.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs mb-1">Date</label>
        <Input
          type="date"
          value={date}
          onChange={handleDateChange}
          className="max-w-xs"
        />
      </div>
    </div>
  );
};

export default DashboardFilters;