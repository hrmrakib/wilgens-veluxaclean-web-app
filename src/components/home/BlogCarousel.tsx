"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useGetAllBlogsQuery } from "@/redux/features/blog/blogAPI";
import { Calendar } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface IBlogPost {
  _id: string;
  title: string;
  description: string;
  image: string[];
  createdAt: string;
  updatedAt: string;
}

export default function BlogCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { data: blogs } = useGetAllBlogsQuery({});

  // Get number of visible cards based on screen size
  const getVisibleCards = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCards(getVisibleCards());
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
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
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = blogs?.data?.result?.length - visibleCards;
        return prevIndex >= maxIndex ? 0 : prevIndex + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, visibleCards, blogs?.data?.result]);

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const handleCardClick = (href: string) => {
    console.log(`Navigating to: ${href}`);
    // In a real app, this would handle navigation
  };

  const maxIndex = blogs?.data?.result?.length - visibleCards;

  return (
    <section
      id='blog-section'
      className='py-16 lg:py-24 bg-gray-50'
      style={{
        background:
          "radial-gradient(61.56% 61.56% at 50% 50%, rgba(21, 178, 245, 0.0936) 0%, rgba(110, 206, 218, 0.0468) 100%)",
      }}
    >
      <div className='container mx-auto'>
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className='text-4xl md:text-5xl lg:text-[52px] font-bold text-[#4A4A4A] mb-6'>
            Explore Insights in Our Blog
          </h2>
          <p className='text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed'>
            Find lots of insights and information on our blog. Explore, learn,
            and get inspired today.
          </p>
        </div>

        {/* Carousel Container */}
        <div className='relative'>
          <div className='overflow-hidden' ref={carouselRef}>
            <div
              className='flex transition-transform duration-500 ease-in-out'
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / visibleCards)
                }%)`,
              }}
            >
              {blogs?.data?.result?.map((post: IBlogPost, index: number) => (
                <div
                  key={post._id}
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
                    onClick={() => handleCardClick(post._id)}
                  >
                    <CardContent className='p-0 h-full flex flex-col'>
                      {/* Image */}
                      <div className='relative overflow-hidden rounded-t-lg'>
                        <Image
                          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${post.image}`}
                          alt={post.title}
                          className='w-full h-48 md:h-72 object-cover transition-transform duration-300 group-hover:scale-105'
                          width={400}
                          height={300}
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                      </div>

                      {/* Content */}
                      <div className='p-6 flex-grow flex flex-col'>
                        {/* Date */}
                        <div className='flex items-center text-[#545971] text-lg mb-3'>
                          <Calendar className='w-4 h-4 mr-2' />
                          {post.createdAt.split("T")[0]}
                        </div>

                        {/* Title */}
                        <h3 className='text-xl md:text-[32px] font-bold text-[#4A4A4A] mb-4 group-hover:text-cyan-600 transition-colors duration-300'>
                          {post.title}
                        </h3>

                        {/* Description */}
                        <p className='text-[#545971] text-lg leading-relaxed mb-6 flex-grow'>
                          {post.description?.slice(0, 100) + "..."}
                        </p>

                        {/* Category Tag */}
                        {/* <div className='mt-auto'>
                          <span className='inline-block px-3 py-1 bg-[#DDF6FF] text-gray-700 text-sm rounded-full font-medium group-hover:bg-white group-hover:text-cyan-700 transition-colors duration-300'>
                            {post.description}
                          </span>
                        </div> */}
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
                className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
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
