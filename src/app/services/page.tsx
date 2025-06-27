"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Star, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  { id: "all", name: "All Categories", count: 45 },
  { id: "residential", name: "Residential Cleaning Services", count: 18 },
  { id: "move-in-out", name: "Move-In/Move-Out", count: 12 },
  { id: "carpet", name: "Carpet Cleaning Service", count: 8 },
  { id: "commercial", name: "Commercial Cleaning Service", count: 7 },
];

const servicesByCategory = {
  residential: [
    {
      id: 1,
      title: "1 Bedroom/ 1 Bathroom",
      price: 180,
      image: "/service8.png",
      bedrooms: 1,
      bathrooms: 1,
      rating: 4.8,
      reviews: 124,
      duration: "2-3 hours",
    },
    {
      id: 2,
      title: "2 Bedrooms/ 1 Bathroom",
      price: 170,
      image: "/service2.png",
      bedrooms: 2,
      bathrooms: 1,
      rating: 4.9,
      reviews: 89,
      duration: "3-4 hours",
    },
    {
      id: 3,
      title: "2 Bedrooms/ 2 Bathrooms",
      price: 190,
      image: "/service3.png",
      bedrooms: 2,
      bathrooms: 2,
      rating: 4.7,
      reviews: 156,
      duration: "3-4 hours",
    },
    {
      id: 4,
      title: "3 Bedrooms/ 1 Bathroom",
      price: 210,
      image: "/service4.png",
      bedrooms: 3,
      bathrooms: 1,
      rating: 4.8,
      reviews: 203,
      duration: "4-5 hours",
    },
    {
      id: 5,
      title: "3 Bedrooms/ 2 Bathrooms",
      price: 240,
      image: "/service1.png",
      bedrooms: 3,
      bathrooms: 2,
      rating: 4.9,
      reviews: 178,
      duration: "4-5 hours",
    },
    {
      id: 6,
      title: "4 Bedrooms/ 2 Bathrooms",
      price: 290,
      image: "/service2.png",
      bedrooms: 4,
      bathrooms: 2,
      rating: 4.6,
      reviews: 92,
      duration: "5-6 hours",
    },
    {
      id: 7,
      title: "5 Bedrooms/ 2 Bathrooms",
      price: 380,
      image: "/service3.png",
      bedrooms: 5,
      bathrooms: 2,
      rating: 4.8,
      reviews: 67,
      duration: "6-7 hours",
    },
    {
      id: 8,
      title: "4 Bedrooms/ 3 Bathrooms",
      price: 330,
      image: "/service4.png",
      bedrooms: 4,
      bathrooms: 3,
      rating: 4.7,
      reviews: 134,
      duration: "5-6 hours",
    },
    {
      id: 9,
      title: "5 Bedrooms/ 3 Bathrooms",
      price: 440,
      image: "/service5.png",
      bedrooms: 5,
      bathrooms: 3,
      rating: 4.9,
      reviews: 45,
      duration: "6-8 hours",
    },
    {
      id: 10,
      title: "6 Bedrooms/ 3 Bathrooms",
      price: 490,
      image: "/service6.png",
      bedrooms: 6,
      bathrooms: 3,
      rating: 4.8,
      reviews: 28,
      duration: "7-8 hours",
    },
    {
      id: 11,
      title: "6 Bedrooms/ 4 Bathrooms",
      price: 530,
      image: "/service7.png",
      bedrooms: 6,
      bathrooms: 4,
      rating: 4.9,
      reviews: 31,
      duration: "7-9 hours",
    },
  ],
  "move-in-out": [
    {
      id: 12,
      title: "Studio Move-In Cleaning",
      price: 120,
      image: "/service8.png",
      bedrooms: 0,
      bathrooms: 1,
      rating: 4.7,
      reviews: 89,
      duration: "2-3 hours",
    },
    {
      id: 13,
      title: "1 Bedroom Move-Out Deep Clean",
      price: 200,
      image: "/service1.png",
      bedrooms: 1,
      bathrooms: 1,
      rating: 4.8,
      reviews: 156,
      duration: "3-4 hours",
    },
    {
      id: 14,
      title: "2 Bedroom Move-In Service",
      price: 250,
      image: "/service2.png",
      bedrooms: 2,
      bathrooms: 1,
      rating: 4.9,
      reviews: 203,
      duration: "4-5 hours",
    },
    {
      id: 15,
      title: "3 Bedroom Move-Out Complete",
      price: 320,
      image: "/service3.png",
      bedrooms: 3,
      bathrooms: 2,
      rating: 4.6,
      reviews: 134,
      duration: "5-6 hours",
    },
    {
      id: 16,
      title: "Apartment Deep Clean",
      price: 180,
      image: "/service4.png",
      bedrooms: 1,
      bathrooms: 1,
      rating: 4.8,
      reviews: 178,
      duration: "3-4 hours",
    },
    {
      id: 17,
      title: "House Move-In Premium",
      price: 450,
      image: "/service5.png",
      bedrooms: 4,
      bathrooms: 3,
      rating: 4.9,
      reviews: 67,
      duration: "6-8 hours",
    },
  ],
  carpet: [
    {
      id: 18,
      title: "Living Room Carpet Cleaning",
      price: 80,
      image: "/service6.png",
      bedrooms: 0,
      bathrooms: 0,
      rating: 4.6,
      reviews: 234,
      duration: "1-2 hours",
    },
    {
      id: 19,
      title: "Bedroom Carpet Deep Clean",
      price: 60,
      image: "/service8.png",
      bedrooms: 0,
      bathrooms: 0,
      rating: 4.7,
      reviews: 189,
      duration: "1 hour",
    },
    {
      id: 20,
      title: "Whole House Carpet Cleaning",
      price: 250,
      image: "/service7.png",
      bedrooms: 0,
      bathrooms: 0,
      rating: 4.9,
      reviews: 178,
      duration: "4-5 hours",
    },
    {
      id: 21,
      title: "Stair Carpet Cleaning",
      price: 45,
      image: "/service1.png",
      bedrooms: 0,
      bathrooms: 0,
      rating: 4.5,
      reviews: 156,
      duration: "30-45 min",
    },
    {
      id: 22,
      title: "Pet Odor Carpet Treatment",
      price: 120,
      image: "/service2.png",
      bedrooms: 0,
      bathrooms: 0,
      rating: 4.8,
      reviews: 203,
      duration: "2-3 hours",
    },
    {
      id: 23,
      title: "Commercial Carpet Cleaning",
      price: 180,
      image: "/service4.png",
      bedrooms: 0,
      bathrooms: 0,
      rating: 4.7,
      reviews: 134,
      duration: "3-4 hours",
    },
  ],
  commercial: [
    {
      id: 24,
      title: "Small Office Cleaning",
      price: 150,
      image: "/service5.png",
      bedrooms: 0,
      bathrooms: 1,
      rating: 4.7,
      reviews: 92,
      duration: "2-3 hours",
    },
    {
      id: 25,
      title: "Large Office Complex",
      price: 800,
      image: "/service6.png",
      bedrooms: 0,
      bathrooms: 4,
      rating: 4.8,
      reviews: 45,
      duration: "8-10 hours",
    },
    {
      id: 26,
      title: "Restaurant Deep Clean",
      price: 400,
      image: "/service7.png",
      bedrooms: 0,
      bathrooms: 2,
      rating: 4.9,
      reviews: 67,
      duration: "5-6 hours",
    },
    {
      id: 27,
      title: "Retail Store Cleaning",
      price: 200,
      image: "/service8.png",
      bedrooms: 0,
      bathrooms: 1,
      rating: 4.6,
      reviews: 134,
      duration: "3-4 hours",
    },
    {
      id: 28,
      title: "Medical Facility Sanitization",
      price: 350,
      image: "/service2.png",
      bedrooms: 0,
      bathrooms: 3,
      rating: 4.9,
      reviews: 89,
      duration: "4-5 hours",
    },
  ],
};

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = React.useState("all");
  const [isVisible, setIsVisible] = React.useState(false);
  const [hoveredCard, setHoveredCard] = React.useState<number | null>(null);
  const [openCategory, setOpenCategory] = React.useState<boolean>(true);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("services-page");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const scrollToCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    if (categoryId !== "all") {
      const element = document.getElementById(`category-${categoryId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleServiceClick = (serviceId: number) => {
    console.log(`Service ${serviceId} clicked`);
  };

  const handleBookNow = (serviceId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`Book now clicked for service ${serviceId}`);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderServiceCard = (service: any, index: number) => (
    <Link href={`/services/${service.id}`} key={service.id}>
      <Card
        key={service.id}
        className={`group cursor-pointer transition-all duration-700 hover:shadow-xl hover:-translate-y-2 overflow-hidden ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: `${index * 100}ms` }}
        onMouseEnter={() => setHoveredCard(service.id)}
        onMouseLeave={() => setHoveredCard(null)}
        onClick={() => handleServiceClick(service.id)}
      >
        <CardContent className='p-0 h-full flex flex-col'>
          {/* Image */}
          <div className='relative overflow-hidden'>
            <Image
              src={service.image || "/placeholder.svg"}
              alt={service.title}
              className='w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105'
              width={300}
              height={200}
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
          </div>

          {/* Content */}
          <div className='p-4 flex-grow flex flex-col'>
            {/* Title */}
            <h3 className='text-base font-bold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors duration-300 line-clamp-2'>
              {service.title}
            </h3>

            {/* Room Info */}
            {(service.bedrooms > 0 || service.bathrooms > 0) && (
              <div className='flex items-center space-x-3 mb-2 text-sm text-gray-600'>
                {service.bedrooms > 0 && (
                  <div className='flex items-center space-x-1'>
                    <Bed className='w-3 h-3' />
                    <span>{service.bedrooms}</span>
                  </div>
                )}
                {service.bathrooms > 0 && (
                  <div className='flex items-center space-x-1'>
                    <Bath className='w-3 h-3' />
                    <span>{service.bathrooms}</span>
                  </div>
                )}
              </div>
            )}

            {/* Rating */}
            <div className='flex items-center space-x-1 mb-2'>
              <Star className='w-3 h-3 text-yellow-400 fill-yellow-400' />
              <span className='text-xs font-medium text-gray-900'>
                {service.rating}
              </span>
              <span className='text-xs text-gray-500'>({service.reviews})</span>
            </div>

            {/* Duration */}
            <p className='text-xs text-gray-600 mb-3'>{service.duration}</p>

            {/* Price and Book Button */}
            <div className='mt-auto flex items-center justify-between'>
              <div className='flex items-center space-x-1'>
                <span className='text-lg font-bold text-cyan-600'>
                  Starting from ${service.price}
                </span>
              </div>
              <Button
                size='sm'
                className={`text-xs px-3 py-1 transition-all duration-300 ${
                  hoveredCard === service.id
                    ? "bg-cyan-600 hover:bg-cyan-700 scale-105"
                    : "bg-cyan-500 hover:bg-cyan-600"
                }`}
                onClick={(e) => handleBookNow(service.id, e)}
              >
                Book
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );

  return (
    <section
      id='services-page'
      className='py-8 lg:py-12 min-h-screen'
      style={{
        background:
          "radial-gradient(61.56% 61.56% at 50% 50%, rgba(21, 178, 245, 0.0816) 0%, rgba(110, 206, 218, 0.0408) 100%)",
      }}
    >
      <div className='container mx-auto px-5'>
        <div className='grid lg:grid-cols-4 gap-8'>
          {/* Sidebar - Categories */}
          <div
            className={`lg:col-span-1 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className='bg-white rounded-lg shadow-sm p-6 sticky top-8'>
              <div
                className={`flex items-center justify-between ${
                  openCategory ? "pb-2.5" : "pb-0"
                }`}
              >
                <h2 className='text-xl font-bold text-gray-900'>Categories</h2>
                <p className='flex md:hidden cursor-pointer'>
                  {openCategory ? (
                    <span onClick={() => setOpenCategory(false)}>hide</span>
                  ) : (
                    <span onClick={() => setOpenCategory(true)}>show</span>
                  )}
                </p>
              </div>
              {openCategory && (
                <div className='space-y-2'>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => scrollToCategory(category.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-between group ${
                        activeCategory === category.id
                          ? "bg-cyan-500 text-white shadow-md"
                          : "text-gray-700 hover:bg-gray-100 hover:text-cyan-600"
                      }`}
                    >
                      <span className='font-medium text-sm'>
                        {category.name}
                      </span>
                      <Badge
                        variant='secondary'
                        className={`text-xs ${
                          activeCategory === category.id
                            ? "bg-white/20 text-white"
                            : "bg-gray-200 text-gray-600 group-hover:bg-cyan-100 group-hover:text-cyan-700"
                        }`}
                      >
                        {category.count}
                      </Badge>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Main Content - All Services by Category */}
          <div className='lg:col-span-3 space-y-12 lg:space-y-24'>
            {/* Page Header */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-2'>
                Our Services
              </h1>
              <p className='text-gray-600'>
                Comprehensive cleaning solutions for every need. Browse our
                complete catalog of professional services.
              </p>
            </div>

            {/* Residential Cleaning Services */}
            <div id='category-residential' className='space-y-6'>
              <div className='flex items-center justify-between'>
                <h2 className='text-2xl font-bold text-gray-900'>
                  Residential Cleaning Services
                </h2>
                {/* <Button
                  variant='outline'
                  size='sm'
                  className='text-cyan-600 border-cyan-600 hover:bg-cyan-50'
                >
                  View All <ArrowRight className='w-4 h-4 ml-1' />
                </Button> */}
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10'>
                {servicesByCategory.residential.map((service, index) =>
                  renderServiceCard(service, index)
                )}
              </div>
            </div>

            {/* Move-In/Move-Out */}
            <div id='category-move-in-out' className='space-y-6'>
              <div className='flex items-center justify-between'>
                <h2 className='text-2xl font-bold text-gray-900'>
                  Move-In/Move-Out
                </h2>
                <Button
                  variant='outline'
                  size='sm'
                  className='text-cyan-600 border-cyan-600 hover:bg-cyan-50'
                >
                  View All <ArrowRight className='w-4 h-4 ml-1' />
                </Button>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10'>
                {servicesByCategory["move-in-out"].map((service, index) =>
                  renderServiceCard(service, index)
                )}
              </div>
            </div>

            {/* Carpet Cleaning Service */}
            <div id='category-carpet' className='space-y-6'>
              <div className='flex items-center justify-between'>
                <h2 className='text-2xl font-bold text-gray-900'>
                  Carpet Cleaning Service
                </h2>
                <Button
                  variant='outline'
                  size='sm'
                  className='text-cyan-600 border-cyan-600 hover:bg-cyan-50'
                >
                  View All <ArrowRight className='w-4 h-4 ml-1' />
                </Button>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10'>
                {servicesByCategory.carpet.map((service, index) =>
                  renderServiceCard(service, index)
                )}
              </div>
            </div>

            {/* Commercial Cleaning Service */}
            <div id='category-commercial' className='space-y-6'>
              <div className='flex items-center justify-between'>
                <h2 className='text-2xl font-bold text-gray-900'>
                  Commercial Cleaning Service
                </h2>
                <Button
                  variant='outline'
                  size='sm'
                  className='text-cyan-600 border-cyan-600 hover:bg-cyan-50'
                >
                  View All <ArrowRight className='w-4 h-4 ml-1' />
                </Button>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10'>
                {servicesByCategory.commercial.map((service, index) =>
                  renderServiceCard(service, index)
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
