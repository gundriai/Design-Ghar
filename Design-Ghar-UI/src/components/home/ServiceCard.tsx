import { Link } from 'react-router-dom';
import { Category } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CardHoverEffect } from '@/components/ui/CardHoverEffect';


export default function ServiceCard(category: Category) {
  return (
    <CardHoverEffect>
      <Card
        className="h-[420px] min-h-[420px] w-full max-w-[370px] mx-auto bg-white border border-gray-200 shadow-md transition-all duration-300 ease-[cubic-bezier(.4,0,.2,1)] group-hover:shadow-xl group-hover:scale-[1.04] group-hover:border-primary/80 relative overflow-hidden"
        style={{ backgroundImage: `url(${category.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-white/10 group-hover:bg-primary/10 transition-colors duration-300 z-0" />
        <div className="relative z-10 flex flex-col h-full justify-between">
          <CardContent className="text-center flex-1 flex items-center justify-center">
            <CardDescription className="text-gray-700 font-medium drop-shadow">
              {/* {service.description} */}
            </CardDescription>
          </CardContent>
          <CardFooter className="pt-0 flex flex-col items-center gap-4">
            <CardTitle className="text-2xl font-extrabold text-primary drop-shadow-md mb-2">
              {category.name}
            </CardTitle>
            <Link to={`/products/${category.id}`} className="w-full">
              <Button 
                variant="outline" 
                className="w-full border-primary text-primary hover:bg-primary/10 font-semibold"
              >
                See More
              </Button>
            </Link>
          </CardFooter>
        </div>
      </Card>
    </CardHoverEffect>
  );
}