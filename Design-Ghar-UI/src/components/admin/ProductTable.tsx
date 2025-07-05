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
import { useData } from '@/context/DataContext';

export default function ProductTable() {
  const { products } = useData();

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
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="w-12 h-12 rounded overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium max-w-[150px] truncate">
                {product.title}
              </TableCell>
              <TableCell>
                {product.category || 'N/A'}
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  {product.discountedPrice && (
                    <span className="text-green-600 font-medium">
                      Rs. {product.discountedPrice}
                    </span>
                  )}
                  <span className={product.discountedPrice ? "text-gray-500 line-through text-sm" : ""}>
                    Rs. {product.price}
                  </span>
                </div>
              </TableCell>
              <TableCell>{product.discount ? `${product.discount}%` : 'None'}</TableCell>
              <TableCell>{product.featured ? 'Yes' : 'No'}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <button
                    className="p-2 border rounded text-gray-500 bg-white"
                    disabled
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    className="p-2 border rounded text-red-500 bg-white"
                    disabled
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {products.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                No products found. Add a new product to get started.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}