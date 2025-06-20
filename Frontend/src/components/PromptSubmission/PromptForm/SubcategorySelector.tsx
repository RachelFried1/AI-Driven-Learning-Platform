import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useAppSelector } from '@/app/hooks';

interface SubcategorySelectorProps {
  categoryId: string;
  value: string;
  onChange: (value: string) => void;
}

const SubcategorySelector: React.FC<SubcategorySelectorProps> = ({ categoryId, value, onChange }) => {
  const { subcategories } = useAppSelector((state) => state.categories);

  return (
    <div className="space-y-2">
      <Label htmlFor="subcategory">Subcategory</Label>
      <Select
        value={value}
        onValueChange={onChange}
        disabled={!categoryId}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a subcategory" />
        </SelectTrigger>
        <SelectContent>
          {(subcategories[categoryId] || []).map((subcategory) => (
            <SelectItem key={subcategory.id} value={subcategory.id.toString()}>
              {subcategory.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SubcategorySelector;