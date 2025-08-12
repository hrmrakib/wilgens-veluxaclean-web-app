"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useGetReviewsQuery } from "@/redux/features/review/reviewAPI";

interface IReview {
  _id: string;
  review: string;
  rating: number;
  user: {
    name: string;
    email: string;
    createdAt: string;
    image: string;
  };
  service: string;
  createdAt: string;
  updatedAt: string;
}

export default function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | string | null>(null);

  const { data: testimonials } = useGetReviewsQuery({});


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("testimonials-section");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const handleShareThought = () => {
    console.log("Share Your Thought clicked");
    // In a real app, this would open a feedback form or modal
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? "text-orange-400 fill-orange-400" : "text-gray-300"
        } transition-colors duration-200`}
      />
    ));
  };

  return (
    <section
      id='testimonials-section'
      className='py-16 lg:py-24 bg-white px-6 md:px-0'
    >
      <div className='container mx-auto px-4 max-w-7xl'>
        {/* Header Section */}
        <div className='flex flex-col md:flex-row items-center justify-between gap-12 mb-16'>
          {/* Left Side - Main Heading */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <h2 className='max-w-[580px] text-4xl md:text-5xl lg:text-[54px] font-bold text-[#4A4A4A] leading-tight'>
              They Satisfied With Our Service
            </h2>
          </div>

          {/* Right Side - Testimonials Header */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <h3 className='text-2xl md:text-[28px] font-semibold text-[#15B2F5] mb-2'>
              Testimonials
            </h3>
            <p className='max-w-[430px] text-lg text-[#45565F] leading-relaxed'>
              Have many related needs, we present a suitable package for you
              needs
            </p>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
          {testimonials?.data?.result.map(
            (testimonial: IReview, index: number) => (
              <Card
                key={testimonial._id}
                className={`group cursor-pointer transition-all duration-700 hover:shadow-xl hover:-translate-y-2 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${600 + index * 200}ms` }}
                onMouseEnter={() => setHoveredCard(testimonial._id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardContent className='p-8 h-full flex flex-col'>
                  {/* Profile Section */}
                  <div className='flex items-center space-x-4 mb-6'>
                    <div className='relative'>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${testimonial?.user?.image}`}
                        alt={testimonial?.user?.name}
                        className='w-16 h-16 rounded-full object-cover border-4 border-gray-100 group-hover:border-cyan-200 transition-colors duration-300'
                        width={80}
                        height={80}
                      />
                      <div className='absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center'>
                        <MessageCircle className='w-3 h-3 text-white' />
                      </div>
                    </div>
                    <div>
                      <h4 className='text-xl font-semibold text-[#334047] group-hover:text-primary transition-colors duration-300'>
                        {testimonial?.user?.name}
                      </h4>
                      <p className='text-gray-600 text-sm'>
                        {/* {testimonial?.service} */}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className='flex items-center space-x-1 mb-6'>
                    {renderStars(testimonial?.rating)}
                  </div>

                  {/* Testimonial Text */}
                  <div className='flex-grow'>
                    <p className='text-gray-600 italic leading-relaxed text-base'>
                      &quot;{testimonial?.review}&quot;
                    </p>
                  </div>

                  {/* Hover Effect Indicator */}
                  <div
                    className={`mt-6 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-300 ${
                      hoveredCard === testimonial._id
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-0"
                    }`}
                  />
                </CardContent>
              </Card>
            )
          )}
        </div>

        {/* Share Your Thought Button */}
        <div
          className={`text-center transition-all duration-1000 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Link href={"/services"}>
            <Button
              size='lg'
              className='bg-[#6ECEDA] hover:bg-primary text-white text-lg font-medium px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer'
              onClick={handleShareThought}
            >
              Share Your Thought
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
