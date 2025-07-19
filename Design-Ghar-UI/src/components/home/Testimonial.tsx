import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const testimonials = [
  {
    id: "testimonial-1",
    text: "Design Ghar has elevated the standard of design in our printing industry. Their creative work saves us time and enhances the quality of our prints. It's like having a top-tier design team at our fingertips.",
    name: "Deepak Raj Acharya",
    designation: "Owner, Raj Offset Printer",
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
  },
  {
    id: "testimonial-2",
    text: "Our school’s branding, from banners to digital flyers, has transformed thanks to Design Ghar. Their professionalism and fast delivery have made them our go-to design partner.",
    name: "Sunil Gautam",
    designation: "Principal, Shanti Niketan Vidyalaya",
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
  },
  {
    id: "testimonial-3",
    text: "Design Ghar is a one-stop solution for all our promotional design needs. Their fresh ideas and quick turnaround time make them stand out. Highly recommended!",
    name: "Suman Sharma",
    designation: "Owner, Fuji International",
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
  },
  {
    id: "testimonial-4",
    text: "For a tech business like ours, design is key—and Design Ghar delivers every time. Their work is clean, modern, and on-point with our brand image.",
    name: "Dharma KC",
    designation: "Owner, Apex Computer",
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
  },
  {
    id: "testimonial-5",
    text: "We were searching for a design team that understands education and impact. Design Ghar delivered more than designs—they gave us visual identity and consistency.",
    name: "Teeka Jung",
    designation: "CEO, Raj Vidhya",
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
  },
  {
    id: "testimonial-6",
    text: "From print layouts to social media creatives, Design Ghar has supported our publication with precision and style. They truly understand visual communication.",
    name: "Raj Kumar Chaudhary",
    designation: "Editor, Gorakshya",
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp",
  },
];

const Testimonial = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const updateCurrent = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", updateCurrent);
    return () => {
      api.off("select", updateCurrent);
    };
  }, [api]);

  useEffect(() => {
    if (!api) {
      return;
    }

    const interval = setInterval(() => {
      const nextIndex = (current + 1) % testimonials.length;
      api.scrollTo(nextIndex);
    }, 10000);

    return () => clearInterval(interval);
  }, [api, current]);

  return (
    <section className="py-4">
      <div className="text-center mb-12">
        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-slate-800 mb-4">
          Client Stories
        </h2>
        <div className="w-20 h-1 bg-rose-500 mx-auto mb-4"></div>
        <p className="max-w-2xl mx-auto text-slate-600 mb-8">
          Every Design Has a Story
          <br />
          Here’s what our clients say about our design
        </p>
      </div>
      <Carousel setApi={setApi}>
        <CarouselContent>
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.id}>
              <div className="flex flex-col items-center text-center">
                <p className="mb-8 max-w-4xl font-normal md:px-8 lg:text-lg">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <Avatar className="mb-2 size-12 md:size-24">
                  <AvatarImage src={testimonial.avatar} />
                  <AvatarFallback>{testimonial.name}</AvatarFallback>
                </Avatar>
                <p className="mb-1 text-sm font-medium md:text-lg">
                  {testimonial.name}
                </p>
                <p className="text-xs md:text-sm">{testimonial.designation}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex justify-center py-1">
        {testimonials.map((testimonial, index) => (
          <Button
            key={testimonial.id}
            variant="ghost"
            size="sm"
            onClick={() => {
              api?.scrollTo(index);
            }}
          >
            <div
              className={`size-2.5 rounded-full ${
                index === current ? "bg-primary" : "bg-gray-300"
              }`}
            />
          </Button>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
