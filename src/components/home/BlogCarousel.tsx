"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import Image from "next/image";

const blogPosts = [
  {
    id: 1,
    date: "17 June 2025",
    title: "Window Cleaning",
    description:
      "Discover the ultimate guide to troubleshooting common smart home issues in our latest blog post. From connectivity problems to device malfunctions...",
    category: "Residential",
    image: "/placeholder.svg?height=300&width=400",
    href: "/blog/window-cleaning",
  },
  {
    id: 2,
    date: "18 June 2025",
    title: "Bedroom Cleaning",
    description:
      "Discover the ultimate guide to troubleshooting common smart home issues in our latest blog post. From connectivity problems to device malfunctions...",
    category: "Move-in/Move-out",
    image: "/placeholder.svg?height=300&width=400",
    href: "/blog/bedroom-cleaning",
  },
  {
    id: 3,
    date: "19 June 2025",
    title: "Bathroom Cleaning",
    description:
      "Discover the ultimate guide to troubleshooting common smart home issues in our latest blog post. From connectivity problems to device malfunctions...",
    category: "Carpet",
    image: "/placeholder.svg?height=300&width=400",
    href: "/blog/bathroom-cleaning",
  },
  {
    id: 4,
    date: "20 June 2025",
    title: "Kitchen Deep Clean",
    description:
      "Discover the ultimate guide to troubleshooting common smart home issues in our latest blog post. From connectivity problems to device malfunctions...",
    category: "Residential",
    image: "/placeholder.svg?height=300&width=400",
    href: "/blog/kitchen-cleaning",
  },
  {
    id: 5,
    date: "21 June 2025",
    title: "Office Sanitization",
    description:
      "Discover the ultimate guide to troubleshooting common smart home issues in our latest blog post. From connectivity problems to device malfunctions...",
    category: "Commercial",
    image: "/placeholder.svg?height=300&width=400",
    href: "/blog/office-sanitization",
  },
  {
    id: 6,
    date: "22 June 2025",
    title: "Carpet Restoration",
    description:
      "Discover the ultimate guide to troubleshooting common smart home issues in our latest blog post. From connectivity problems to device malfunctions...",
    category: "Carpet",
    image: "/placeholder.svg?height=300&width=400",
    href: "/blog/carpet-restoration",
  },
];

export default function BlogCarousel() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);
  const carouselRef = React.useRef<HTMLDivElement>(null);

  // Get number of visible cards based on screen size
  const getVisibleCards = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const [visibleCards, setVisibleCards] = React.useState(3);

  React.useEffect(() => {
    const handleResize = () => {
      setVisibleCards(getVisibleCards());
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("blog-section");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  // Auto-play functionality
  React.useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = blogPosts.length - visibleCards;
        return prevIndex >= maxIndex ? 0 : prevIndex + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, visibleCards]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => {
      const maxIndex = blogPosts.length - visibleCards;
      return prevIndex >= maxIndex ? 0 : prevIndex + 1;
    });
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => {
      const maxIndex = blogPosts.length - visibleCards;
      return prevIndex <= 0 ? maxIndex : prevIndex - 1;
    });
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const handleCardClick = (href: string) => {
    console.log(`Navigating to: ${href}`);
    // In a real app, this would handle navigation
  };

  const maxIndex = blogPosts.length - visibleCards;

  return (
    <section id='blog-section' className='py-16 lg:py-24 bg-gray-50'>
      <div className='container mx-auto px-4 max-w-7xl'>
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6'>
            Explore Insights in Our Blog
          </h2>
          <p className='text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed'>
            Find lots of insights and information on our blog. Explore, learn,
            and get inspired today.
          </p>
        </div>

        {/* Carousel Container */}
        <div className='relative'>
          {/* Navigation Buttons */}
          <Button
            variant='outline'
            size='icon'
            className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50'
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className='w-5 h-5' />
          </Button>

          <Button
            variant='outline'
            size='icon'
            className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50'
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
          >
            <ChevronRight className='w-5 h-5' />
          </Button>

          {/* Carousel */}
          <div className='overflow-hidden' ref={carouselRef}>
            <div
              className='flex transition-transform duration-500 ease-in-out'
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / visibleCards)
                }%)`,
              }}
            >
              {blogPosts.map((post, index) => (
                <div
                  key={post.id}
                  className={`flex-shrink-0 px-4 transition-all duration-700 ${
                    visibleCards === 1
                      ? "w-full"
                      : visibleCards === 2
                      ? "w-1/2"
                      : "w-1/3"
                  } ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <Card
                    className='group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 h-full'
                    onClick={() => handleCardClick(post.href)}
                  >
                    <CardContent className='p-0 h-full flex flex-col'>
                      {/* Image */}
                      <div className='relative overflow-hidden rounded-t-lg'>
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          className='w-full h-48 md:h-56 object-cover transition-transform duration-300 group-hover:scale-105'
                          width={400}
                          height={300}
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                      </div>

                      {/* Content */}
                      <div className='p-6 flex-grow flex flex-col'>
                        {/* Date */}
                        <div className='flex items-center text-gray-500 text-sm mb-3'>
                          <Calendar className='w-4 h-4 mr-2' />
                          {post.date}
                        </div>

                        {/* Title */}
                        <h3 className='text-xl md:text-2xl font-bold text-gray-900 mb-4 group-hover:text-cyan-600 transition-colors duration-300'>
                          {post.title}
                        </h3>

                        {/* Description */}
                        <p className='text-gray-600 leading-relaxed mb-6 flex-grow'>
                          {post.description}
                        </p>

                        {/* Category Tag */}
                        <div className='mt-auto'>
                          <span className='inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium group-hover:bg-cyan-100 group-hover:text-cyan-700 transition-colors duration-300'>
                            {post.category}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className='flex justify-center mt-8 space-x-2'>
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-cyan-500 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
