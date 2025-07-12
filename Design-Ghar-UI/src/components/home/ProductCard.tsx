import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Product } from '@/types';
import { motion } from 'framer-motion';
import { Image, Phone } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card 
        className="overflow-hidden h-full hover:shadow-xl transition-all"
      >
        <CardHeader className="p-0 relative overflow-hidden aspect-square">
          <img 
            src={product.mediaURLs?.[0] || '/placeholder.png'} // Fallback image
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
          {product.discountPercentage && (
            <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
              {product.discountPercentage}% OFF
            </Badge>
          )}
        </CardHeader>
        
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
          
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
          
          <div className="flex items-baseline mt-2">
            {product.finalPrice && (
              <span className="text-green-600 font-bold text-lg">
                Rs. {product.finalPrice}
              </span>
            )}
            <span className={`${product.finalPrice ? 'ml-2 text-gray-500 line-through text-sm' : 'text-green-600 font-bold text-lg'}`}>
              Rs. {product.finalPrice}
            </span>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
          <Button 
            size="sm"
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <Phone className="h-4 w-4 mr-1" />
            Call to Buy
          </Button>
          
          <Link to={`/products/${product.categoryId}/${product.id}`} className="flex-1">
            <Button 
              variant="outline" 
              size="sm"
              className="w-full border-indigo-600 text-indigo-600 hover:bg-indigo-50"
            >
              <Image className="h-4 w-4 mr-1" />
              More
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}