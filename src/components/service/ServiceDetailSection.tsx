/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, MapPin, Phone, Mail, ChevronRight, Star } from "lucide-react";
import BookingPage from "@/app/temp/page";

interface BookingFormData {
  name: string;
  phone: string;
  email: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
}

const services = [
  "Bathroom Deep Cleaning (Bathtub, Shower, Counter)",
  "Toilet/Sink Cleaning (3 main parts will be clean accordingly)",
  "Kitchen Cleaning (Without Kitchen Hood, Inside Cabinet will not be clean but will wipe accordingly)",
  "Carpet Cleaning",
];

const additionalResidentialServices = [
  "Move Cleaning $50 - $150 (depending on size)",
  "Interior For Window Cleaning $5",
  "Pet Hair Removal $30-$50 Extra",
  "Inside Fridge Cleaning $30",
  "Inside Oven Cleaning $35",
  "Inside Cabinets $50",
];

const additionalCarpetServices = [
  "Stain Carpet Shampooing $30-$50",
  "Hot Seat & Sofa Treatment $40-$60",
];

export default function ServiceDetailSection() {
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s\-$$$$]{10,}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmitStatus("success");
      setFormData({ name: "", phone: "", email: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className='min-h-screen bg-white'>
      {/* Hero Section */}
      <div className='relative bg-[url("/service/banner.png")] overflow-hidden'>
        <div className='absolute inset-0 bg-white/20'></div>
        <div className='relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16'>
          {/* Breadcrumb */}
          <nav className='flex items-center space-x-2 text-sm text-gray-600 mb-6'>
            <Link href='/' className='hover:text-gray-900 transition-colors'>
              Home
            </Link>
            <ChevronRight className='w-4 h-4' />
            <Link
              href='/services'
              className='hover:text-gray-900 transition-colors'
            >
              Service
            </Link>
          </nav>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center'>
            {/* Service Info */}
            <div className='lg:col-span-2'>
              <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4'>
                Bedroom & Bathroom
              </h1>

              <div className='flex items-center space-x-4 mb-6'>
                <span className='text-2xl lg:text-3xl font-bold text-gray-900'>
                  $150
                </span>
                <span className='text-xl text-gray-600'>- $300</span>
                <div className='flex items-center space-x-1'>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className='w-5 h-5 fill-yellow-400 text-yellow-400'
                    />
                  ))}
                  <span className='text-sm text-gray-600 ml-2'>(4.8)</span>
                </div>
              </div>

              <div className='space-y-3'>
                <div className='flex items-center space-x-3'>
                  <Check className='w-5 h-5 text-green-600 flex-shrink-0' />
                  <span className='text-gray-700'>On time work completion</span>
                </div>
                <div className='flex items-center space-x-3'>
                  <Check className='w-5 h-5 text-green-600 flex-shrink-0' />
                  <span className='text-gray-700'>
                    Trusted and Experienced Cleaner
                  </span>
                </div>
                <div className='flex items-center space-x-3'>
                  <Check className='w-5 h-5 text-green-600 flex-shrink-0' />
                  <span className='text-gray-700'>
                    Best Quality Cleaning Accessories
                  </span>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            {/* <div className='lg:col-span-1'>
              <div className='bg-white rounded-2xl p-6 shadow-lg border border-gray-200'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='text-lg font-semibold text-gray-900'>
                    Book Now
                  </h3>
                  {submitStatus === "success" && (
                    <span className='text-sm text-green-600 font-medium'>
                      Booking submitted!
                    </span>
                  )}
                </div>

                <form onSubmit={handleSubmit} className='space-y-4'>
                  <div>
                    <input
                      type='text'
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder='Enter your name'
                      className={`
                        w-full px-4 py-3 rounded-lg border transition-colors duration-200
                        focus:outline-none focus:ring-2 focus:ring-cyan-500
                        ${errors.name ? "border-red-300" : "border-gray-300"}
                      `}
                    />
                    {errors.name && (
                      <p className='mt-1 text-xs text-red-600'>{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type='tel'
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      placeholder='Phone'
                      className={`
                        w-full px-4 py-3 rounded-lg border transition-colors duration-200
                        focus:outline-none focus:ring-2 focus:ring-cyan-500
                        ${errors.phone ? "border-red-300" : "border-gray-300"}
                      `}
                    />
                    {errors.phone && (
                      <p className='mt-1 text-xs text-red-600'>
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type='email'
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder='Email'
                      className={`
                        w-full px-4 py-3 rounded-lg border transition-colors duration-200
                        focus:outline-none focus:ring-2 focus:ring-cyan-500
                        ${errors.email ? "border-red-300" : "border-gray-300"}
                      `}
                    />
                    {errors.email && (
                      <p className='mt-1 text-xs text-red-600'>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className={`
                      w-full py-3 px-4 rounded-lg font-medium transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2
                      ${
                        isSubmitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-cyan-500 hover:bg-cyan-600 text-white"
                      }
                    `}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </form>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-12'>
            {/* Overview Section */}
            <section>
              <h2 className='text-2xl lg:text-3xl font-bold text-gray-900 mb-6'>
                Overview Of Home Cleaning
              </h2>
              <p className='text-gray-600 leading-relaxed mb-8'>
                As we all know, house work has a host of advantages for women.
                We&apos;re listing out the best of the best benefits of working
                from home, since they should be aware of and used their day
                right and also read more for women work is meant for excitement,
                employment, like economy, and the planet.
              </p>

              {/* Service Image */}
              <div className='rounded-2xl overflow-hidden mb-8'>
                <Image
                  src='/service/service.png'
                  alt='Professional cleaners working'
                  width={600}
                  height={300}
                  className='w-full h-auto object-cover'
                />
              </div>
            </section>

            {/* Services Section */}
            <section>
              <h3 className='text-xl lg:text-2xl font-bold text-gray-900 mb-6'>
                Our Bedroom & bathroom services
              </h3>
              <ul className='space-y-3'>
                {services.map((service, index) => (
                  <li key={index} className='flex items-start space-x-3'>
                    <div className='w-2 h-2 bg-[#27484C] rounded-full mt-2 flex-shrink-0'></div>
                    <span className='text-gray-700'>{service}</span>
                  </li>
                ))}
              </ul>
              <p className='text-gray-600 mt-4 text-sm'>
                Perfect service for the home for cleaning job or are already
                working virtually, check out this list of the advantages of
                working from home, along with some of the top companies that
                hire for remote jobs.
              </p>
            </section>

            {/* Additional Services */}
            <section>
              <h3 className='text-xl lg:text-2xl font-bold text-gray-900 mb-6'>
                Additional Residential Service
              </h3>
              <ul className='space-y-3'>
                {additionalResidentialServices.map((service, index) => (
                  <li key={index} className='flex items-start space-x-3'>
                    <div className='w-2 h-2 bg-[#27484C] rounded-full mt-2 flex-shrink-0'></div>
                    <span className='text-gray-700'>{service}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Carpet Cleaning Services */}
            <section>
              <h3 className='text-xl lg:text-2xl font-bold text-gray-900 mb-6'>
                Additional Carpet Cleaning Service
              </h3>
              <ul className='space-y-3'>
                {additionalCarpetServices.map((service, index) => (
                  <li key={index} className='flex items-start space-x-3'>
                    <div className='w-2 h-2 bg-[#27484C] rounded-full mt-2 flex-shrink-0'></div>
                    <span className='text-gray-700'>{service}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          {/* <div className='lg:col-span-1'>
            <div className='bg-gray-50 rounded-2xl p-6 sticky top-8'>
              <h3 className='text-xl font-bold text-gray-900 mb-6'>
                Contact Details
              </h3>

              <div className='space-y-4'>
                <div className='flex items-start space-x-3'>
                  <MapPin className='w-5 h-5 text-cyan-500 mt-1 flex-shrink-0' />
                  <div>
                    <p className='text-gray-700 font-medium'>
                      785 15th Street, Office 468
                    </p>
                    <p className='text-gray-600'>Berlin, De 845612</p>
                  </div>
                </div>

                <div className='flex items-center space-x-3'>
                  <Phone className='w-5 h-5 text-cyan-500 flex-shrink-0' />
                  <a
                    href='tel:+45612345765'
                    className='text-gray-700 hover:text-cyan-600 transition-colors duration-200'
                  >
                    +45612345765
                  </a>
                </div>

                <div className='flex items-center space-x-3'>
                  <Mail className='w-5 h-5 text-cyan-500 flex-shrink-0' />
                  <a
                    href='mailto:creativeitem@gmail.com'
                    className='text-gray-700 hover:text-cyan-600 transition-colors duration-200'
                  >
                    creativeitem@gmail.com
                  </a>
                </div>
              </div>

              <div className='mt-8 space-y-3'>
                <button className='w-full py-3 px-4 bg-cyan-500 text-white font-medium rounded-lg hover:bg-cyan-600 transition-colors duration-200'>
                  Call Now
                </button>
                <button className='w-full py-3 px-4 border-2 border-cyan-500 text-cyan-600 font-medium rounded-lg hover:bg-cyan-50 transition-colors duration-200'>
                  Get Quote
                </button>
              </div>

              <div className='mt-8 pt-6 border-t border-gray-200'>
                <h4 className='font-medium text-gray-900 mb-3'>
                  Service Hours
                </h4>
                <div className='space-y-2 text-sm text-gray-600'>
                  <div className='flex justify-between'>
                    <span>Monday - Friday</span>
                    <span>8:00 AM - 6:00 PM</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Saturday</span>
                    <span>9:00 AM - 4:00 PM</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Sunday</span>
                    <span>Emergency Only</span>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>

        <BookingPage />
      </div>
    </div>
  );
}
