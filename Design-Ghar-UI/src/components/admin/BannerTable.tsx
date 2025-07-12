import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useData } from '@/context/DataContext';
import { useToast } from '@/hooks/use-toast';
import { Banner } from '@/types';
import { Edit, ImageIcon, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import BannerForm from './BannerForm';

export default function BannerTable() {
  const { banners, addBanner, updateBanner, deleteBanner } = useData();
  const { toast } = useToast();
  
  const [view, setView] = useState<'table' | 'add' | 'edit' | 'delete'>('table');
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);

  // Add Banner
  const handleAddBanner = (data: any) => {
    if (!data.title || !data.image) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }
    addBanner({ ...data, link: data.link || '#' });
    toast({ title: 'Success', description: 'Banner added successfully' });
    setView('table');
  };

  // Edit Banner
  const handleEditBanner = (data: any) => {
    if (!selectedBanner) return;
    if (!data.title || !data.image) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }
    updateBanner({ id: selectedBanner.id, ...data });
    toast({ title: 'Success', description: 'Banner updated successfully' });
    setView('table');
  };

  // Delete Banner
  const handleDeleteBanner = () => {
    if (!selectedBanner) return;
    deleteBanner(selectedBanner.id);
    toast({ title: 'Success', description: 'Banner deleted successfully' });
    setView('table');
  };

  // UI
  if (view === 'add') {
    return (
      <>
        <nav className="text-sm text-gray-500 mb-4 flex items-center gap-2">
          <span
            className="cursor-pointer hover:underline"
            onClick={() => setView('table')}
          >
            Admin
          </span>
          <span className="mx-1">/</span>
          <span
            className="cursor-pointer hover:underline"
            onClick={() => setView('table')}
          >
            Banners
          </span>
          <span className="mx-1">/</span>
          <span>Add Banner</span>
        </nav>
        <BannerForm
          mode="add"
          onSave={handleAddBanner}
          onCancel={() => setView('table')}
        />
      </>
    );
  }
  if (view === 'edit' && selectedBanner) {
    return (
      <>
        <nav className="text-sm text-gray-500 mb-4 flex items-center gap-2">
          <span
            className="cursor-pointer hover:underline"
            onClick={() => setView('table')}
          >
            Admin
          </span>
          <span className="mx-1">/</span>
          <span
            className="cursor-pointer hover:underline"
            onClick={() => setView('table')}
          >
            Banners
          </span>
          <span className="mx-1">/</span>
          <span>Edit Banner</span>
        </nav>
        <BannerForm
          mode="edit"
          initialData={selectedBanner}
          onSave={handleEditBanner}
          onCancel={() => setView('table')}
        />
      </>
    );
  }
  if (view === 'delete' && selectedBanner) {
    return (
      <>
        <nav className="text-sm text-gray-500 mb-4 flex items-center gap-2">
          <span
            className="cursor-pointer hover:underline"
            onClick={() => setView('table')}
          >
            Admin
          </span>
          <span className="mx-1">/</span>
          <span
            className="cursor-pointer hover:underline"
            onClick={() => setView('table')}
          >
            Banners
          </span>
          <span className="mx-1">/</span>
          <span>Delete Banner</span>
        </nav>
        <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow p-8 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-6">Are you sure you want to delete the banner "{selectedBanner.title}"? This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setView('table')}>Cancel</Button>
              <Button variant="destructive" onClick={handleDeleteBanner}>Delete Banner</Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Table view
  return (
    <div className="space-y-4">
      <div className="flex justify-end items-center">
        <Button onClick={() => { setView('add'); }}>
          <Plus className="mr-2 h-4 w-4" />
          Add Banner
        </Button>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Date Range</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {banners.map((banner) => (
              <TableRow key={banner.id}>
                <TableCell>
                  <div className="w-20 h-12 rounded overflow-hidden bg-gray-100">
                    {banner.image ? (
                      <img 
                        src={banner.image} 
                        alt={banner.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{banner.title}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{formatDate(banner.startDate)}</div>
                    <div className="text-gray-500">to</div>
                    <div>{formatDate(banner.endDate)}</div>
                  </div>
                </TableCell>
                <TableCell>{banner.priority}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => { setSelectedBanner(banner); setView('edit'); }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => { setSelectedBanner(banner); setView('delete'); }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {banners.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                  No banners found. Add a new banner to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}