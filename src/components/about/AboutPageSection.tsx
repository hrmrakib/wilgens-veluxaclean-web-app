"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";
import Image from "next/image";

const services = [
  "Residential Cleaning Services Near You!",
  "Commercial Cleaning Service In USA.",
  "Move-In/Move-Out",
  "Carpet Cleaning Service",
];

export default function AboutPageSection() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [counters, setCounters] = React.useState({
    customers: 0,
    projects: 0,
    happy: 0,
    team: 0,
  });

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          startCountAnimation();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("about-page-section");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const startCountAnimation = () => {
    const targets = {
      customers: 2500,
      projects: 4200,
      happy: 1700,
      team: 80,
    };

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounters({
        customers: Math.floor(targets.customers * progress),
        projects: Math.floor(targets.projects * progress),
        happy: Math.floor(targets.happy * progress),
        team: Math.floor(targets.team * progress),
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setCounters(targets);
      }
    }, stepDuration);
  };

  const formatNumber = (num: number, suffix: string) => {
    if (suffix === "k") {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  return (
    <section id='about-page-section' className='py-16 lg:py-24 bg-white'>
      {/* Statistics Section */}
      <div
        className={`grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 transition-all duration-1000 pb-6 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ boxShadow: "0px 25px 38px -5px rgba(115,115,115,0.4)" }}
      >
        <div className='text-center'>
          <div className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-2'>
            {formatNumber(counters.customers, "k")}
          </div>
          <p className='text-gray-600 text-base md:text-lg'>
            Satisfied Customer
          </p>
        </div>
        <div className='text-center'>
          <div className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-2'>
            {formatNumber(counters.projects, "k")}
          </div>
          <p className='text-gray-600 text-base md:text-lg'>Complete Project</p>
        </div>
        <div className='text-center'>
          <div className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-2'>
            {formatNumber(counters.happy, "k")}
          </div>
          <p className='text-gray-600 text-base md:text-lg'>Happy Customers</p>
        </div>
        <div className='text-center'>
          <div className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-2'>
            {counters.team}
          </div>
          <p className='text-gray-600 text-base md:text-lg'>Team Members</p>
        </div>
      </div>
      <div className='container mx-auto px-4'>
        {/* Main Content Section */}
        <div className='grid lg:grid-cols-2 gap-16 items-center'>
          {/* Left Side - Content */}
          <div
            className={`space-y-8 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            {/* Main Heading */}
            <div className='space-y-6'>
              <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight'>
                We Provide Top Quality Cleaning
              </h2>

              <div className='space-y-4'>
                <p className='text-gray-600 text-lg leading-relaxed'>
                  Training programs can bring you a super exciting experience of
                  learning through online! You never face any negative
                  experience while enjoying your classes Awesome site. on the
                  top advertising a Courses available business having..
                </p>

                <p className='text-gray-600 text-base leading-relaxed'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  vulputate ad litora torquent
                </p>
              </div>
            </div>

            {/* Services List */}
            <div className='space-y-4'>
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-4 group transition-all duration-700 hover:translate-x-2 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${600 + index * 150}ms` }}
                >
                  <div className='flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center group-hover:bg-[] transition-colors duration-300'>
                    <Clock className='w-6 h-6 text-cyan-500 group-hover:text-white transition-colors duration-300' />
                  </div>
                  <p className='text-gray-700 text-base group-hover:text-cyan-600 transition-colors duration-300'>
                    {service}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Image with Floating Elements */}
          <div
            className={`relative transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className='relative w-full max-w-lg mx-auto'>
              {/* Main Image */}
              <div className='relative'>
                <Image
                  src='/about/cleaner.png'
                  alt='Professional cleaner in blue uniform with cleaning supplies'
                  className='w-full h-auto object-cover rounded-2xl'
                  width={400}
                  height={500}
                />
              </div>

              {/* Floating UI Elements */}
              {/* Cleaning Office Card */}
              <Card
                className={`absolute top-28 right-2 p-4 bg-white shadow-xl border-0 transition-all duration-700 delay-700 hover:scale-105 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-4"
                }`}
              >
                <div className='flex items-center space-x-3'>
                  <div className='w-12 h-12 rounded-xl flex items-center justify-center'>
                    <Image
                      src='/about/tool-box.png'
                      alt='Assisted people icon'
                      className='w-10 h-10 text-blue-600'
                      width={480}
                      height={480}
                    />
                  </div>
                  <div>
                    <p className='text-2xl font-bold text-gray-900'>16+</p>
                    <p className='text-sm text-gray-600'>Cleaning Office</p>
                  </div>
                </div>
              </Card>

              {/* Assisted People Card */}
              <Card
                className={`absolute bottom-12 left-0 p-4 bg-white shadow-xl border-0 transition-all duration-700 delay-900 hover:scale-105 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <div className='flex items-center space-x-3'>
                  <div className='w-12 h-12 bg-transparent rounded-xl flex items-center justify-center'>
                    <Image
                      src='/about/user.png'
                      alt='Assisted people icon'
                      className='w-10 h-10 text-blue-600'
                      width={480}
                      height={480}
                    />
                  </div>
                  <div>
                    <p className='text-2xl font-bold text-gray-900'>100+</p>
                    <p className='text-sm text-gray-600'>Assisted People</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
