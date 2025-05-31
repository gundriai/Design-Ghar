import { Link } from 'react-router-dom';
import { Service } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="h-full bg-white hover:shadow-xl transition-shadow overflow-hidden">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-24 h-24 mb-4">
            <img 
              src={service.icon} 
              alt={service.name}
              className="w-full h-full object-contain"
            />
          </div>
          <CardTitle className="text-xl font-semibold text-indigo-900">
            {service.name}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="text-center">
          <CardDescription className="text-gray-600">
            {service.description}
          </CardDescription>
        </CardContent>
        
        <CardFooter className="pt-0 justify-center">
          <Link to={`/product/${service.id}`}>
            <Button 
              variant="outline" 
              className="border-indigo-600 text-indigo-600 hover:bg-indigo-50"
            >
              See More
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}