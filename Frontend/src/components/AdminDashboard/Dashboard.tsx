import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, BookOpen, MessageSquare, Search } from 'lucide-react';
import { promptService } from '../../services/prompt';
import { PromptHistory, Category, Subcategory } from '../../types';
import { toast } from '@/hooks/use-toast';

const Dashboard: React.FC = () => {
  // Filters and pagination state
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [subCategoryId, setSubCategoryId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

  // Data state
  const [items, setItems] = useState<PromptHistory[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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
    setSubCategoryId('');
  }, [categoryId]);

  // Fetch prompt data with filters and pagination
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await promptService.getAllPrompts({
          page,
          limit,
          search: searchTerm,
          categoryId,
          subCategoryId,
          startDate,
          endDate,
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
  }, [page, limit, searchTerm, categoryId, subCategoryId, startDate, endDate]);

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

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [searchTerm, categoryId, subCategoryId, startDate, endDate]);

  return (
    <div className="space-y-6">
      {/* Filter Inputs */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-xs mb-1">Search</label>
              <Input
                placeholder="Search by user, prompt, or category..."
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
              <label className="block text-xs mb-1">Start Date</label>
              <Input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs mb-1">End Date</label>
              <Input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table and Pagination */}
      <Card>
        <CardHeader>
          <CardTitle>User Activity</CardTitle>
          <CardDescription>
            All user prompts and AI-generated lessons
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Prompt</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Subcategory</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.userName || 'Unknown User'}
                      </TableCell>
                      <TableCell className="max-w-md">
                        <div className="truncate" title={item.prompt}>
                          {item.prompt}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{item.subcategory}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {formatDate(item.createdAt)}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "Lesson Details",
                              description: "Feature coming soon",
                            });
                          }}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {items.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No results found.
                </div>
              )}
              {/* Pagination Controls */}
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-600">
                  Page {page} of {totalPages} | Total: {totalItems}
                </span>
                <div className="space-x-2">
                  <Button variant="outline" size="sm" onClick={handlePrev} disabled={page === 1}>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleNext} disabled={page === totalPages}>
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;