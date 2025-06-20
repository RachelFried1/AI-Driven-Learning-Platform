import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Category, Subcategory } from '../../types';

interface HistoryFiltersProps {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  categoryId: string;
  setCategoryId: (v: string) => void;
  subCategoryId: string;
  setSubCategoryId: (v: string) => void;
  date: string;
  setDate: (v: string) => void;
  categories: Category[];
  subcategories: Subcategory[];
}

const HistoryFilters: React.FC<HistoryFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  categoryId,
  setCategoryId,
  subCategoryId,
  setSubCategoryId,
  date,
  setDate,
  categories,
  subcategories,
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Filters</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-xs mb-1">Search</label>
          <Input
            placeholder="Search by prompt or lesson..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
        </div>
        <div>
          <label className="block text-xs mb-1">Category</label>
          <select
            value={categoryId}
            onChange={e => setCategoryId(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">All</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs mb-1">Subcategory</label>
          <select
            value={subCategoryId}
            onChange={e => setSubCategoryId(e.target.value)}
            className="border rounded px-2 py-1"
            disabled={!categoryId}
          >
            <option value="">All</option>
            {subcategories.map(sub => (
              <option key={sub.id} value={sub.id}>{sub.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs mb-1">Date</label>
          <Input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default HistoryFilters;