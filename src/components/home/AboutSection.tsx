"use client";

import * as React from "react";
import { Clock, MapPin, Calendar, Check, BadgeCheck } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: BadgeCheck,
    title: "Satisfaction",
    subtitle: "Guarantee",
    description: "100% satisfaction guaranteed or we'll make it right",
  },
  {
    icon: Clock,
    title: "24H",
    subtitle: "Availability",
    description: "Round-the-clock service availability for your convenience",
  },
  {
    icon: MapPin,
    title: "Local US",
    subtitle: "Professional",
    description: "Trusted local professionals in your community",
  },
  {
    icon: Calendar,
    title: "Flexible",
    subtitle: "Appointments",
    description: "Schedule cleaning services at your convenience",
  },
];

const benefits = [
  {
    title: "We are Committed",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit eiusmod tempor incididunt",
  },
  {
    title: "Trusted Professionals",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit eiusmod tempor incididunt",
  },
  {
    title: "Highly Rated Cleaning",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit eiusmod tempor incididunt",
  },
];
 
export default function AboutSection() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [hoveredFeature, setHoveredFeature] = React.useState<number | null>(
    null
  );

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("about-section");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section id='about-section' className='py-16 lg:py-24 bg-gray-50'>
      <div className='container mx-auto'>
        {/* Top Features Row */}
        <div className='max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14 mb-20'>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`text-center group cursor-pointer transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className='flex items-center justify-center space-x-2.5 md:space-x-5'>
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                    hoveredFeature === index
                      ? "bg-cyan-500 scale-110"
                      : "bg-[#F5F5F5] group-hover:bg-cyan-200"
                  }`}
                >
                  <feature.icon
                    className={`w-7 h-7 transition-colors duration-300 ${
                      hoveredFeature === index ? "text-white" : "text-cyan-500"
                    }`}
                  />
                </div>
                <div className='flex flex-col items-start space-y-1'>
                  <h3 className='font-semibold text-[#7A7979] text-lg'>
                    {feature.title}
                  </h3>
                  <p className='text-[#7A7979] text-lg font-semibold'>
                    {feature.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className='flex flex-col lg:flex-row gap-16 items-center justify-between px-5 md:px-0'>
          {/* Left Side - Image Collage */}
          <div
            className={`lg:w-1/2 relative transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className='relative w-full lg:h-[600px]'>
              {/* Main large image - woman vacuuming sofa */}

              <div className='w-full lg:h-[600px] overflow-hidden'>
                <div className='h-full flex items-center justify-center relative'>
                  <Image
                    src='/about.png'
                    alt='Professional cleaner vacuuming blue sofa in modern living room'
                    className='w-full h-full object-cover'
                    width={975}
                    height={500}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div
            className={`lg:w-1/2 max-w-[570px] space-y-8 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            {/* Main Heading */}
            <div className='space-y-6'>
              <h2 className='text-4xl md:text-5xl lg:text-[36px] font-semibold text-[#4A4A4A] leading-tight'>
                We Are Very Experienced In Cleaning Services
              </h2>
              <p className='text-gray-600 text-lg leading-relaxed'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit eius mod
                tempor incididunt ut labore
              </p>
            </div>

            {/* Benefits List */}
            <div className='space-y-8'>
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-4 group cursor-pointer transition-all duration-700 hover:translate-x-2 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${600 + index * 200}ms` }}
                >
                  <div className='flex-shrink-0 w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center mt-1 group-hover:bg-cyan-500 transition-colors duration-300'>
                    <Check className='w-5 h-5 text-cyan-500 group-hover:text-white transition-colors duration-300' />
                  </div>
                  <div className='space-y-3'>
                    <h3 className='text-xl font-bold text-gray-900 group-hover:text-cyan-600 transition-colors duration-300'>
                      {benefit.title}
                    </h3>
                    <p className='text-gray-600 leading-relaxed text-base'>
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
