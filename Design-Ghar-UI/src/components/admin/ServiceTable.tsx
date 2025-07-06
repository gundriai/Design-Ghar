import { useState } from 'react';
import { categoryData } from '@/context/CategoryContext';
import { Edit, Trash2 } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Category } from '@/types';

interface ServiceTableProps {
  services: Category[];
  onEdit: (service: Category) => void;
  onDelete: (service: Category) => void;
}

export default function ServiceTable({ services, onEdit, onDelete }: ServiceTableProps) {
  const { updateCategory } = categoryData();
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const formData = new FormData();
  const handleToggleActive = async (service: Category) => {

    service.isActive = !service.isActive; // Toggle the active state
    formData.append('isActive', String(service.isActive));
    await updateCategory(service.id as string, formData);
    setUpdatingId(null);
  };

  return (
    <div className="space-y-4">
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Icon</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell>
                  <div className="w-10 h-10">
                    <img 
                      src={service.imageUrl} 
                      alt={service.name} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{service.name}</TableCell>
                <TableCell>{service.sku}</TableCell>
                <TableCell className="max-w-xs truncate">{service.description}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {service.tags && service.tags.length > 0 ? service.tags.map(tag => (
                      <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">{tag}</span>
                    )) : <span className="text-gray-400 text-xs">—</span>}
                  </div>
                </TableCell>
                <TableCell>
                  <button
                    type="button"
                    className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors duration-200 ${service.isActive ? 'bg-green-500' : 'bg-gray-300'} ${updatingId === service.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => handleToggleActive(service)}
                    aria-pressed={service.isActive}
                    disabled={updatingId === service.id}
                  >
                    <span
                      className={`h-4 w-4 bg-white rounded-full shadow transform transition-transform duration-200 ${service.isActive ? 'translate-x-5' : ''}`}
                    />
                  </button>
                  <span className="ml-2 text-xs text-gray-600">{service.isActive ? 'On' : 'Off'}</span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onEdit(service)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => onDelete(service)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {services.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                  No services found. Add a new service to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}