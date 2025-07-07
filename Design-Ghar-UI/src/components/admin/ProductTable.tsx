import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { Edit, Trash2 } from 'lucide-react';
import { Product } from '@/types';
import { Switch } from '@/components/ui/switch';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  const handleToggleActive = (product: Product) => {
    // Logic to toggle isActive status
    product.isActive = !product.isActive;
    // Call API or update context here
  };

  return (
    <div className="border rounded-lg mt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead>Active</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="w-12 h-12 rounded overflow-hidden">
                  <img 
                    src={product.mediaURLs?.[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium max-w-[150px] truncate">
                {product.name}
              </TableCell>
              <TableCell>
                {product.categoryName || 'N/A'}
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  {product.finalPrice && (
                    <span className="text-green-600 font-medium">
                      Rs. {product.finalPrice}
                    </span>
                  )}
                  <span className={product.finalPrice ? "text-gray-500 line-through text-sm" : ""}>
                    Rs. {product.basePrice}
                  </span>
                </div>
              </TableCell>
              <TableCell>{product.discountPercentage ? `${product.discountPercentage}%` : 'None'}</TableCell>
              <TableCell>{product.isFeatured ? 'Yes' : 'No'}</TableCell>
              <TableCell>
                <Switch
                  checked={product.isActive}
                  onChange={() => handleToggleActive(product)}
                />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <button
                    className="p-2 border rounded text-gray-500 bg-white"
                    onClick={() => onEdit(product)}
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    className="p-2 border rounded text-red-500 bg-white"
                    onClick={() => onDelete(product)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {products.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                No products found. Add a new product to get started.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}