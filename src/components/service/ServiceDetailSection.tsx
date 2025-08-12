/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ChevronRight, Star } from "lucide-react";
import BookingPage from "@/components/service/BookingForm";
import { useGetServiceByIdQuery } from "@/redux/features/service/servioceAPI";
import { useParams } from "next/navigation";

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
  const params = useParams();
  const { data: service } = useGetServiceByIdQuery(params.slug);


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
                {service?.data?.serviceName}
              </h1>

              <div className='flex items-center space-x-4 mb-6'>
                <span className='text-2xl lg:text-3xl font-bold text-gray-900'>
                  Starting From ${service?.data?.price}
                </span>

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
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-12'>
            <div className='md:hidden'>
              <BookingPage />
            </div>

            {/* Overview Section */}
            <section>
              <h2 className='text-2xl lg:text-3xl font-bold text-gray-900 mb-6'>
                {service?.data?.serviceName}
              </h2>
              <p className='text-gray-600 leading-relaxed mb-8'>
                {service?.data?.details}
              </p>

              {/* Service Image */}
              <div className='rounded-2xl overflow-hidden mb-8'>
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${service?.data?.image}`}
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
              {service?.data?.additionalServices ? (
                <ul className='space-y-3'>
                  {Object.entries(service.data.additionalServices).map(
                    ([serviceName, price], index) => (
                      <li key={index} className='flex items-start space-x-3'>
                        <div className='w-2 h-2 bg-[#27484C] rounded-full mt-2 flex-shrink-0'></div>
                        <span className='text-gray-700'>
                          {serviceName} -{" "}
                          <span className='font-medium text-black'>
                            ${String(price)}
                          </span>
                        </span>
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p className='text-gray-500'>No additional services listed.</p>
              )}
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
        </div>

        <BookingPage />
      </div>
    </div>
  );
}
