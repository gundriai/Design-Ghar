import { Link } from 'react-router-dom';
import { Category } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CardHoverEffect } from '@/components/ui/CardHoverEffect';


export default function ServiceCard(service: Category) {
  return (
    <CardHoverEffect>
      <Card className="h-full bg-white border border-gray-200 shadow-md transition-all duration-300 ease-[cubic-bezier(.4,0,.2,1)] group-hover:shadow-xl group-hover:scale-[1.04] group-hover:border-primary/80 group-hover:bg-[linear-gradient(135deg,_rgba(0,174,239,0.15)_0%,_#fff_80%)]">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-24 h-24 mb-4">
            <img 
              src={service.icon} 
              alt={service.name}
              className="w-full h-full object-contain"
            />
          </div>
          <CardTitle className="text-xl font-semibold text-primary">
            {service.name}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="text-center">
          <CardDescription className="text-gray-600">
            {service.description}
          </CardDescription>
        </CardContent>
        
        <CardFooter className="pt-0 justify-center">
          <Link to={`/products/${service.id}`}>
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary/10"
            >
              See More
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </CardHoverEffect>
  );
}