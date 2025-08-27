"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, Phone, MapPin, CheckCircle } from "lucide-react";
import Image from "next/image";
import ContactFormSection from "../contact/ContactFormSection";
import { useEffect, useState } from "react";

const contactInfo = [
  {
    icon: Clock,
    title: "Hours Of Operation",
    details: "Mon-Fri: 9AM - 5PM",
  },
  {
    icon: Phone,
    title: "24/7 Emergency Service",
    details: "(205) 484-9624",
  },
  {
    icon: MapPin,
    title: "Service Area",
    details: "Morrisville PA 19067",
  },
];

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("contact-section");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const handlePhoneClick = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  if (isSubmitted) {
    return (
      <section id='contact-section' className='py-16 lg:py-24 bg-gray-50'>
        <div className='container mx-auto px-4 max-w-4xl'>
          <Card className='p-8 text-center'>
            <div className='flex flex-col items-center space-y-4'>
              <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center'>
                <CheckCircle className='w-8 h-8 text-green-600' />
              </div>
              <h3 className='text-2xl font-bold text-gray-900'>Thank You!</h3>
              <p className='text-gray-600'>
                Your message has been sent successfully. We&apos;ll get back to
                you within 24 hours.
              </p>
              <Button
                onClick={() => setIsSubmitted(false)}
                className='bg-cyan-500 hover:bg-cyan-600 text-white'
              >
                Send Another Message
              </Button>
            </div>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id='contact-section' className='min-h-[90vh]'>
      <div className=''>
        <div className='h-full grid lg:grid-cols-2 gap-0 overflow-hidden shadow-2xl'>
          {/* Left Side - Contact Info with Background Image */}
          <div
            className={`relative bg-[url('/-bg.jpg')] p-8 lg:p-12 flex flex-col justify-center h-full transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            {/* Background Image */}
            <div className='absolute inset-0'>
              <Image
                src='/contact-bg.png'
                alt='Professional cleaning team at work'
                className='w-full h-full object-cover'
                width={1600}
                height={1600}
              />
              <div className='absolute inset-0 bg-[#0000009c] gradient-to-r from-[#0000006c] to-[#000000a4]' />
            </div>

            {/* Content */}
            <div className='relative z-10 space-y-8'>
              {/* Header */}
              <div className='space-y-4'>
                <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight'>
                  <span className='text-[#15B2F5]'>Get in</span>{" "}
                  <span className='text-white'>Touch</span>
                </h2>
                <p className='max-w-[500px] text-white text-lg md:text-xl leading-relaxed'>
                  Thank you for your interest. We look forward to hearing from
                  you soon.
                </p>
              </div>

              {/* Contact Information */}
              <div className='space-y-6'>
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-4 group cursor-pointer transition-all duration-700 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${300 + index * 150}ms` }}
                    onClick={() =>
                      info.icon === Phone && handlePhoneClick(info.details)
                    }
                  >
                    <div className='w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center group-hover:bg-cyan-400 transition-colors duration-300'>
                      <info.icon className='w-6 h-6 text-white' />
                    </div>
                    <div>
                      <h3 className='text-white font-semibold text-lg group-hover:text-cyan-400 transition-colors duration-300'>
                        {info.title}
                      </h3>
                      <p className='text-gray-300 group-hover:text-white transition-colors duration-300'>
                        {info.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div
            className={`bg-[#ffffff] md:h-[900px] p-8 lg:p-12 flex flex-col justify-center relative transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className='hidden md:flex bg-[#F5F8FD] py-5 px-8 absolute -left-[270px] rounded-t-4xl top-1/2 -translate-y-1/2 -rotate-90 origin-center'>
              <span className='text-[#2F4672] font-medium text-[30px] tracking-wider whitespace-nowrap'>
                Schedule an Appointment
              </span>
            </div>

            <ContactFormSection contactDetail={false} />
          </div>
        </div>
      </div>
    </section>
  );
}
