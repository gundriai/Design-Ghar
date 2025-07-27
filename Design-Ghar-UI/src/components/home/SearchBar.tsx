import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useProduct } from '@/context/ProductContext';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { products } = useProduct();
  const navigate = useNavigate();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.tags?.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
  );

  const handleBlur = (e: React.FocusEvent) => {
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (relatedTarget && relatedTarget.closest('.search-results')) {
      return;
    }
    setIsFocused(false);
  };

  const handleMouseDown = (categoryId: string, productId: string) => {
    console.log(`Navigating to product ${productId} in category ${categoryId}`);
    navigate(`/products/${categoryId}/${productId}`);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 mt-6 relative z-10" style={{ borderColor: 'transparent' }}>
      <div className="flex w-full max-w-3xl mx-auto overflow-hidden rounded-lg border border-primary">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for T-shirts, ID Cards, Canvas..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
            className="h-full w-full pl-12 pr-4 py-3 text-base border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-white text-foreground placeholder-muted-foreground"
          />
        </div>
      </div>

      {isFocused && query && filteredProducts.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-lg mt-2 z-20">
          <ul className="grid grid-cols-1 gap-4 p-4 search-results">
            {filteredProducts.map((product) => (
              <li
                key={product.id}
                className="border rounded-lg p-4 flex items-center gap-4 cursor-pointer"
                style={{ width: '100%' }}
                onMouseDown={() => handleMouseDown(product.categoryId, product.id)}
              >
                <img
                  src={product.mediaURLs?.[0] || '/placeholder.png'}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold truncate">{product.name}</h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {product.description.split(' ').slice(0, 10).join(' ')}...
                  </p>
                  <p className="text-sm font-medium">Rs. {product.finalPrice}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}