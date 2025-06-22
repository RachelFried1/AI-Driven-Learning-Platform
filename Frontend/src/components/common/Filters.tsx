import React, { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { setFilterField, FilterKey, FilterFields } from '@/features/filters/filtersSlice';
import { fetchCategories, fetchSubcategories } from '@/features/categories/categoriesSlice';

interface FiltersProps {
  filterKey: FilterKey;
  searchPlaceholder: string;
}

const Filters: React.FC<FiltersProps> = ({ filterKey, searchPlaceholder }) => {
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

  const handleChange = (field: keyof FilterFields) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    dispatch(setFilterField({ key: filterKey, field, value: e.target.value }));
  };

  return (
    <div className="flex flex-wrap gap-4 items-end mb-4">
      <div>
        <label className="block text-xs mb-1">Search</label>
        <Input
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={handleChange('searchTerm')}
          className="max-w-xs"
        />
      </div>
      <div>
        <label className="block text-xs mb-1">Category</label>
        <select
          value={categoryId}
          onChange={handleChange('categoryId')}
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
          onChange={handleChange('subCategoryId')}
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
          onChange={handleChange('date')}
          className="max-w-xs"
        />
      </div>
    </div>
  );
};

export default Filters;