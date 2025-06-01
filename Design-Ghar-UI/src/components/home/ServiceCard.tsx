import { Link } from 'react-router-dom';
import { Service } from '@/types';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CardHoverEffect } from '@/components/ui/CardHoverEffect';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <CardHoverEffect>
      <Card className="flex flex-col md:flex-row h-full bg-white border border-gray-200 shadow-md transition-all duration-300 ease-[cubic-bezier(.4,0,.2,1)] group-hover:shadow-xl group-hover:scale-[1.04] group-hover:border-primary/80 group-hover:bg-[linear-gradient(135deg,_rgba(0,174,239,0.15)_0%,_#fff_80%)] overflow-hidden">
        {/* Content Section */}
        <div className="flex flex-col justify-between flex-1 p-6 min-h-[220px]">
          <div className="flex-1 flex flex-col">
            <CardTitle className="text-2xl font-bold text-primary mb-2 text-left">
              {service.name}
            </CardTitle>
            <CardDescription className="text-gray-600 text-base text-left mb-4 flex-1">
              {service.description}
            </CardDescription>
          </div>
          <div className="mt-2 flex justify-start">
            <Link to={`/product/${service.id}`}>
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                See More
              </Button>
            </Link>
          </div>
        </div>
        {/* Image Section */}
        <div className="flex items-center justify-center md:w-2/5 bg-[rgba(0,174,239,0.06)] p-6 md:p-0">
          <img
            src={service.icon}
            alt={service.name}
            className="w-60 h-60 object-contain drop-shadow-md"
          />
        </div>
      </Card>
    </CardHoverEffect>
  );
}