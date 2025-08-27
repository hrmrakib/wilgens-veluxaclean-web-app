"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { useGetAllServicesQuery } from "@/redux/features/service/servioceAPI";
import { useEffect, useState } from "react";

interface IService {
  _id: string | number;
  serviceName: string;
  category: string;
  details: string;
  price: number;
  additionalServices: {
    [key: string]: number;
  };
  image: string;
  isDeleted: boolean;
  createdAt: string;
}

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | number | null>(null);
  const [openCategory, setOpenCategory] = useState<boolean>(true);
  const { data: services } = useGetAllServicesQuery({});

  useEffect(() => {
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

  const carpetCount =
    services?.data?.result?.["Carpet Cleaning Service"].length;
  const residentialCount =
    services?.data?.result?.["Residential Cleaning Services"].length;
  const commercialCount =
    services?.data?.result?.["Commercial Cleaning Service"].length;
  const moveCount =
    services?.data?.result?.["Move-in/Move-out Cleaning"].length;

  const categories = [
    {
      id: "all",
      name: "All Categories",
      count: carpetCount + residentialCount + commercialCount + moveCount,
    },
    {
      id: "Carpet Cleaning Service",
      name: "Carpet Cleaning Service",
      count: carpetCount,
    },
    {
      id: "Residential Cleaning Services",
      name: "Residential Cleaning Services",
      count: residentialCount,
    },
    {
      id: "Commercial Cleaning Service",
      name: "Commercial Cleaning Service",
      count: commercialCount,
    },
    {
      id: "Move-in/Move-out Cleaning",
      name: "Move-in/Move-out Cleaning",
      count: moveCount,
    },
  ];

  const handleServiceClick = (serviceId: string | number) => {
    console.log(`Service ${serviceId} clicked`);
  };

  const handleBookNow = (serviceId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`Book now clicked for service ${serviceId}`);
  };

  const renderServiceCard = (service: IService, index: number) => (
    <Link href={`/services/${service._id}`} key={service._id}>
      <Card
        key={service?._id}
        className={`group cursor-pointer transition-all duration-700 hover:shadow-xl hover:-translate-y-2 overflow-hidden ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: `${index * 100}ms` }}
        onMouseEnter={() => setHoveredCard(service?._id)}
        onMouseLeave={() => setHoveredCard(null)}
        onClick={() => handleServiceClick(service?._id)}
      >
        <CardContent className='p-0 h-full flex flex-col'>
          {/* Image */}
          <div className='relative overflow-hidden'>
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${service?.image}`}
              alt={service?.serviceName}
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
              {service?.serviceName}
            </h3>

            {/* Price and Book Button */}
            <div className='mt-auto flex items-center justify-between'>
              <div className='flex items-center space-x-1'>
                <span className='text-lg font-bold text-cyan-600'>
                  Starting from ${service?.price}
                </span>
              </div>
              <Button
                size='sm'
                className={`text-xs px-3 py-1 transition-all duration-300 ${
                  hoveredCard === service?._id
                    ? "bg-cyan-600 hover:bg-cyan-700 scale-105"
                    : "bg-cyan-500 hover:bg-cyan-600"
                }`}
                onClick={(e) => handleBookNow(Number(service?._id), e)}
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
                      key={category?.id}
                      onClick={() => scrollToCategory(category?.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-between group ${
                        activeCategory === category?.id
                          ? "bg-cyan-500 text-white shadow-md"
                          : "text-gray-700 hover:bg-gray-100 hover:text-cyan-600"
                      }`}
                    >
                      <span className='font-medium text-sm'>
                        {category?.name}
                      </span>
                      <Badge
                        variant='secondary'
                        className={`text-xs ${
                          activeCategory === category?.id
                            ? "bg-white/20 text-white"
                            : "bg-gray-200 text-gray-600 group-hover:bg-cyan-100 group-hover:text-cyan-700"
                        }`}
                      >
                        {category?.count || 0}
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

            {/* Carpet Cleaning Service */}
            <div
              id='category-Carpet Cleaning Service'
              className='space-y-6 -mt-12'
            >
              <div className='flex items-center justify-between'>
                <h2 className='text-2xl font-bold text-gray-900'>
                  Carpet Cleaning Service
                </h2>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10'>
                {services?.data?.result?.["Carpet Cleaning Service"]?.map(
                  (service: IService, index: number) =>
                    renderServiceCard(service, index)
                )}

                {services?.data?.result?.["Carpet Cleaning Service"].length ===
                  0 && (
                  <div className='my-2.5'>
                    <p className='text-gray-800'>No services found.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Residential Cleaning Services */}
            <div
              id='category-Residential Cleaning Services'
              className='space-y-6'
            >
              <div className='flex items-center justify-between'>
                <h2 className='text-2xl font-bold text-gray-900'>
                  Residential Cleaning Services
                </h2>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10'>
                {services?.data?.result?.["Residential Cleaning Services"]?.map(
                  (service: IService, index: number) =>
                    renderServiceCard(service, index)
                )}

                {services?.data?.result?.["Residential Cleaning Services"]
                  .length === 0 && (
                  <div className='my-2.5'>
                    <p className='text-gray-800'>No services found.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Carpet Cleaning Service */}
            <div
              id='category-Commercial Cleaning Service'
              className='space-y-6'
            >
              <div className='flex items-center justify-between'>
                <h2 className='text-2xl font-bold text-gray-900'>
                  Carpet Cleaning Service
                </h2>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10'>
                {services?.data?.result?.["Commercial Cleaning Service"]?.map(
                  (service: IService, index: number) =>
                    renderServiceCard(service, index)
                )}

                {services?.data?.result?.["Commercial Cleaning Service"]
                  .length === 0 && (
                  <div className='my-2.5'>
                    <p className='text-gray-800'>No services found.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Move-in/Move-out Cleaning */}
            <div id='category-Move-in/Move-out Cleaning' className='space-y-6'>
              <div className='flex items-center justify-between'>
                <h2 className='text-2xl font-bold text-gray-900'>
                  Move-in/Move-out Cleaning
                </h2>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10'>
                {services?.data?.result?.["Move-in/Move-out Cleaning"]?.map(
                  (service: IService, index: number) =>
                    renderServiceCard(service, index)
                )}

                {services?.data?.result?.["Move-in/Move-out Cleaning"]
                  .length === 0 && (
                  <div className='my-2.5'>
                    <p className='text-gray-800'>No services found.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
