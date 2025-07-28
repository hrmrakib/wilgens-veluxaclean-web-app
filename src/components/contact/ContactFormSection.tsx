/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";

import { useState } from "react";
import {
  ChevronDown,
  MapPin,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import Link from "next/link";
import { useCreateCleaningContactMutation } from "@/redux/features/cleaning-contact/cleaningContactAPI";
import { toast } from "sonner";

const serviceOptions = [
  "Carpet Cleaning Service",
  "Residential Cleaning Services",
  "Commercial Cleaning Service",
  "Move-in/Move-out Cleaning",
];

interface FormData {
  name: string;
  email: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  service?: string;
  message?: string;
}

interface ContactFormSectionProps {
  contactDetail?: boolean;
}

export default function ContactFormSection({
  contactDetail = true,
}: ContactFormSectionProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [createCleaningContact] = useCreateCleaningContactMutation();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.service) {
      newErrors.service = "Please select a service";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
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
      const res = await createCleaningContact({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        category: formData.service,
      });

      console.log(res);
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        setSubmitStatus("success");
      }

      console.log(res);

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setFormData({ name: "", email: "", service: "", message: "" });
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleServiceSelect = (service: string) => {
    handleInputChange("service", service);
    setIsDropdownOpen(false);
  };

  console.log(
    formData.name,
    formData.email,
    formData.service,
    formData.message
  );

  return (
    <div className='min-h-screen bg-[#FFFFFF]'>
      {/* Header Section */}
      {contactDetail && (
        <div className='bg-[#FFFFFF]'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8'>
            <div className=''>
              <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4A4A4A] mb-4'>
                We&apos;re here to help you
              </h1>
              <p className='text-lg text-[#838B95]'>
                Shoot us a message if you have any question, we&apos;re here to
                help!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>
          {/* Contact Form */}
          <div
            className={`${
              contactDetail ? "lg:col-span-2 w-full" : "lg:col-span-3 w-full"
            }}`}
          >
            <div className='bg-[#FFFFFF] rounded-2xl p-6 lg:p-8'>
              <form onSubmit={handleSubmit} className='space-y-6'>
                {/* Success/Error Messages */}
                {submitStatus === "success" && (
                  <div className='rounded-lg p-4'>
                    <p className='text-sm text-green-600 font-medium'>
                      Thank you for your message! We&apos;ll get back to you
                      within 24 hours.
                    </p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className='bg-red-50 rounded-lg p-4'>
                    <p className='text-sm text-red-600 font-medium'>
                      Failed to send message. Please try again or contact us
                      directly.
                    </p>
                  </div>
                )}

                {/* Name and Email Row */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label
                      htmlFor='name'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      Your name
                    </label>
                    <input
                      type='text'
                      id='name'
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder='Enter your full name'
                      className={`
                        w-full px-4 py-3 rounded-full border-2 transition-colors duration-200
                        focus:outline-none focus:ring-0
                        ${
                          errors.name
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-200 focus:border-blue-500"
                        }
                      `}
                    />
                    {errors.name && (
                      <p className='mt-1 text-sm text-red-600'>{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      Your email
                    </label>
                    <input
                      type='email'
                      id='email'
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder='Enter your email address'
                      className={`
                        w-full px-4 py-3 rounded-full border-2 transition-colors duration-200
                        focus:outline-none focus:ring-0
                        ${
                          errors.email
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-200 focus:border-blue-500"
                        }
                      `}
                    />
                    {errors.email && (
                      <p className='mt-1 text-sm text-red-600'>
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Service Dropdown */}
                <div>
                  <label
                    htmlFor='service'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    What kind of service are you looking for?
                  </label>
                  <div className='relative'>
                    <button
                      type='button'
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`
                        w-full px-4 py-3 rounded-full border-2 transition-colors duration-200
                        focus:outline-none focus:ring-0 text-left flex items-center justify-between
                        ${
                          errors.service
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-200 focus:border-blue-500"
                        }
                      `}
                    >
                      <span
                        className={
                          formData.service ? "text-gray-900" : "text-gray-500"
                        }
                      >
                        {formData.service || "Select a subject"}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isDropdownOpen && (
                      <div className='absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-2xl shadow-lg max-h-60 overflow-y-auto'>
                        {serviceOptions.map((option) => (
                          <button
                            key={option}
                            type='button'
                            onClick={() => handleServiceSelect(option)}
                            className='w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-2xl last:rounded-b-2xl transition-colors duration-150'
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.service && (
                    <p className='mt-1 text-sm text-red-600'>
                      {errors.service}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor='message'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Message
                  </label>
                  <textarea
                    id='message'
                    rows={6}
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
                    placeholder='Write your message'
                    className={`
                      w-full px-4 py-3 rounded-2xl border-2 transition-colors duration-200
                      focus:outline-none focus:ring-0 resize-none
                      ${
                        errors.message
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-blue-500"
                      }
                    `}
                  />
                  {errors.message && (
                    <p className='mt-1 text-sm text-red-600'>
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className={`
                      px-8 py-3 rounded-full font-medium transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 cursor-pointer 
                      ${
                        isSubmitting
                          ? "bg-[#4A4A4A] cursor-not-allowed"
                          : "bg-[#6ECEDA] hover:bg-[#6ecddad0] text-white"
                      }
                    `}
                  >
                    {isSubmitting ? "Sending..." : "Get In Touch"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Contact Details */}
          {contactDetail && (
            <div className='lg:col-span-1'>
              <div className='bg-[#FFFFFF] rounded-2xl p-6 lg:p-8 h-fit sticky top-8'>
                <h3 className='text-2xl font-bold text-gray-900 mb-6'>
                  Contact Details
                </h3>

                <div className='space-y-6'>
                  {/* Address */}
                  <div className='flex items-start space-x-3'>
                    <MapPin className='w-5 h-5 text-gray-400 mt-1 flex-shrink-0' />
                    <div>
                      <p className='text-gray-600 leading-relaxed'>
                        785 15th Street, Office 468
                        <br />
                        Berlin, De 845612
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className='flex items-center space-x-3'>
                    <Mail className='w-5 h-5 text-gray-400 flex-shrink-0' />
                    <Link
                      href='mailto:creativeitem@gmail.com'
                      className='text-gray-600 hover:text-blue-600 transition-colors duration-200'
                    >
                      creativeitem@gmail.com
                    </Link>
                  </div>

                  {/* Phone */}
                  <div className='flex items-center space-x-3'>
                    <Phone className='w-5 h-5 text-gray-400 flex-shrink-0' />
                    <Link
                      href='tel:+45612345765'
                      className='text-gray-900 font-semibold text-lg hover:text-blue-600 transition-colors duration-200'
                    >
                      +45612345765
                    </Link>
                  </div>

                  {/* Social Media */}
                  <div className='pt-4'>
                    <h4 className='text-sm font-medium text-gray-700 mb-3'>
                      Follow us
                    </h4>
                    <div className='flex space-x-4'>
                      <Link
                        href='#'
                        className='w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-200'
                        aria-label='Facebook'
                      >
                        {/* <Facebook className='w-5 h-5' /> */}
                        <svg
                          width='24'
                          height='22'
                          viewBox='0 0 24 22'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <g clipPath='url(#clip0_185_2253)'>
                            <path
                              d='M23.3143 11.2493C23.3143 5.34713 18.3122 0.5625 12.1418 0.5625C5.97135 0.5625 0.969238 5.34713 0.969238 11.2493C0.969238 16.5833 5.05485 21.0045 10.3961 21.8062V14.3384H7.55929V11.2493H10.3961V8.89484C10.3961 6.21647 12.0641 4.73702 14.6161 4.73702C15.8381 4.73702 17.117 4.94575 17.117 4.94575V7.57569H15.7083C14.3204 7.57569 13.8875 8.39954 13.8875 9.2455V11.2493H16.9861L16.4908 14.3384H13.8875V21.8062C19.2287 21.0045 23.3143 16.5833 23.3143 11.2493Z'
                              fill='#6ECEDA'
                            />
                          </g>
                          <defs>
                            <clipPath id='clip0_185_2253'>
                              <rect
                                width='22.3451'
                                height='21.3735'
                                fill='white'
                                transform='translate(0.969238 0.5625)'
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </Link>
                      <Link
                        href='#'
                        className='w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-200'
                        aria-label='Twitter'
                      >
                        {/* <Twitter className='w-5 h-5' /> */}
                        <svg
                          width='23'
                          height='22'
                          viewBox='0 0 23 22'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <g clipPath='url(#clip0_185_2252)'>
                            <path
                              d='M7.40502 19.933C15.835 19.933 20.4472 13.2509 20.4472 7.45791C20.4472 7.27006 20.4428 7.07803 20.4341 6.89018C21.3313 6.26955 22.1056 5.5008 22.7206 4.62007C21.885 4.97568 20.9978 5.20792 20.0893 5.30887C21.0459 4.76044 21.7621 3.89887 22.1052 2.88389C21.2053 3.394 20.2212 3.75384 19.1951 3.94798C18.5037 3.24528 17.5896 2.78001 16.594 2.6241C15.5984 2.46819 14.5769 2.63033 13.6873 3.08545C12.7978 3.54057 12.0897 4.26332 11.6726 5.14196C11.2556 6.02059 11.1527 7.00618 11.38 7.94633C9.55791 7.85887 7.77537 7.40612 6.14795 6.61743C4.52052 5.82874 3.08454 4.72172 1.9331 3.36814C1.34787 4.33326 1.16879 5.47533 1.43225 6.56221C1.69571 7.6491 2.38195 8.59925 3.35148 9.21956C2.62361 9.19746 1.91169 9.01001 1.27453 8.6727V8.72697C1.27388 9.7398 1.63994 10.7216 2.31049 11.5054C2.98104 12.2893 3.91469 12.8269 4.95274 13.0267C4.27848 13.2032 3.57082 13.2289 2.88451 13.1019C3.17742 13.9729 3.74733 14.7347 4.5147 15.2811C5.28206 15.8274 6.20859 16.1309 7.16498 16.1493C5.54132 17.3692 3.53562 18.0309 1.47092 18.0278C1.10476 18.0273 0.738967 18.0058 0.375488 17.9635C2.473 19.2507 4.91296 19.9343 7.40502 19.933Z'
                              fill='#6ECEDA'
                            />
                          </g>
                          <defs>
                            <clipPath id='clip0_185_2252'>
                              <rect
                                width='22.3451'
                                height='21.3735'
                                fill='white'
                                transform='translate(0.375488 0.5625)'
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </Link>
                      <Link
                        href='#'
                        className='w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-200'
                        aria-label='Instagram'
                      >
                        {/* <Instagram className='w-5 h-5' /> */}
                        <svg
                          width='23'
                          height='22'
                          viewBox='0 0 23 22'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <g clipPath='url(#clip0_185_2251)'>
                            <path
                              d='M11.4646 2.48695C14.32 2.48695 14.6581 2.49948 15.7811 2.54957C16.8247 2.59549 17.3882 2.77082 17.764 2.91693C18.2607 3.10896 18.6197 3.34273 18.9913 3.71426C19.367 4.08997 19.5966 4.4448 19.7886 4.94157C19.9347 5.31728 20.11 5.88501 20.156 6.92447C20.206 8.05159 20.2186 8.38973 20.2186 11.2409C20.2186 14.0963 20.206 14.4344 20.156 15.5574C20.11 16.601 19.9347 17.1646 19.7886 17.5403C19.5966 18.037 19.3628 18.3961 18.9913 18.7676C18.6156 19.1433 18.2607 19.3729 17.764 19.5649C17.3882 19.711 16.8205 19.8864 15.7811 19.9323C14.6539 19.9824 14.3158 19.9949 11.4646 19.9949C8.60923 19.9949 8.2711 19.9824 7.14815 19.9323C6.10452 19.8864 5.54096 19.711 5.16525 19.5649C4.66848 19.3729 4.30948 19.1391 3.93794 18.7676C3.56224 18.3919 3.33264 18.037 3.14061 17.5403C2.9945 17.1646 2.81917 16.5968 2.77325 15.5574C2.72316 14.4303 2.71063 14.0921 2.71063 11.2409C2.71063 8.38555 2.72316 8.04741 2.77325 6.92447C2.81917 5.88084 2.9945 5.31728 3.14061 4.94157C3.33264 4.4448 3.56641 4.08579 3.93794 3.71426C4.31365 3.33856 4.66848 3.10896 5.16525 2.91693C5.54096 2.77082 6.10869 2.59549 7.14815 2.54957C8.2711 2.49948 8.60923 2.48695 11.4646 2.48695ZM11.4646 0.5625C8.56331 0.5625 8.20013 0.575024 7.06048 0.625118C5.92501 0.675212 5.14438 0.858891 4.46811 1.12189C3.76261 1.3974 3.16566 1.76059 2.57288 2.35754C1.97592 2.95033 1.61274 3.54728 1.33722 4.2486C1.07422 4.92905 0.890544 5.70551 0.84045 6.84098C0.790356 7.9848 0.777832 8.34798 0.777832 11.2493C0.777832 14.1506 0.790356 14.5137 0.84045 15.6534C0.890544 16.7889 1.07422 17.5695 1.33722 18.2458C1.61274 18.9513 1.97592 19.5482 2.57288 20.141C3.16566 20.7338 3.76261 21.1011 4.46393 21.3725C5.14438 21.6355 5.92084 21.8192 7.05631 21.8692C8.19595 21.9193 8.55914 21.9319 11.4604 21.9319C14.3617 21.9319 14.7249 21.9193 15.8645 21.8692C17 21.8192 17.7807 21.6355 18.4569 21.3725C19.1582 21.1011 19.7552 20.7338 20.348 20.141C20.9408 19.5482 21.3081 18.9513 21.5795 18.2499C21.8425 17.5695 22.0261 16.793 22.0762 15.6576C22.1263 14.5179 22.1388 14.1547 22.1388 11.2534C22.1388 8.35215 22.1263 7.98897 22.0762 6.84933C22.0261 5.71386 21.8425 4.93322 21.5795 4.25695C21.3165 3.54728 20.9533 2.95033 20.3563 2.35754C19.7635 1.76476 19.1666 1.3974 18.4653 1.12606C17.7848 0.863065 17.0084 0.679387 15.8729 0.629292C14.7291 0.575024 14.3659 0.5625 11.4646 0.5625Z'
                              fill='#6ECEDA'
                            />
                            <path
                              d='M11.4651 5.76172C8.43438 5.76172 5.97559 8.22051 5.97559 11.2512C5.97559 14.2819 8.43438 16.7407 11.4651 16.7407C14.4958 16.7407 16.9546 14.2819 16.9546 11.2512C16.9546 8.22051 14.4958 5.76172 11.4651 5.76172ZM11.4651 14.8121C9.49888 14.8121 7.90421 13.2174 7.90421 11.2512C7.90421 9.28501 9.49888 7.69035 11.4651 7.69035C13.4313 7.69035 15.0259 9.28501 15.0259 11.2512C15.0259 13.2174 13.4313 14.8121 11.4651 14.8121Z'
                              fill='#6ECEDA'
                            />
                            <path
                              d='M18.4533 5.5433C18.4533 6.25297 17.8772 6.82488 17.1717 6.82488C16.462 6.82488 15.8901 6.24879 15.8901 5.5433C15.8901 4.83363 16.4662 4.26172 17.1717 4.26172C17.8772 4.26172 18.4533 4.8378 18.4533 5.5433Z'
                              fill='#6ECEDA'
                            />
                          </g>
                          <defs>
                            <clipPath id='clip0_185_2251'>
                              <rect
                                width='21.3735'
                                height='21.3735'
                                fill='white'
                                transform='translate(0.777832 0.5625)'
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </Link>
                      <Link
                        href='#'
                        className='w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-200'
                        aria-label='Google'
                      >
                        <svg
                          width='23'
                          height='22'
                          viewBox='0 0 23 22'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <g clipPath='url(#clip0_185_2250)'>
                            <path
                              fillRule='evenodd'
                              clipRule='evenodd'
                              d='M15.9794 6.39451C14.8258 5.34213 13.2864 4.76882 11.6935 4.79238C8.77878 4.79238 6.3033 6.6733 5.42065 9.20606C4.95265 10.5333 4.95265 11.9706 5.42065 13.2978H5.42475C6.31149 15.8267 8.78287 17.7076 11.6976 17.7076C13.2022 17.7076 14.4939 17.3395 15.495 16.6893V16.6867C16.6732 15.9406 17.4779 14.7665 17.7283 13.4392H11.6935V9.32394H22.2318C22.3632 10.0386 22.4248 10.769 22.4248 11.4955C22.4248 14.7459 21.2103 17.494 19.0973 19.3552L19.0995 19.3569C17.248 20.9904 14.7068 21.9368 11.6935 21.9368C7.46918 21.9368 3.60611 19.6592 1.70946 16.0505C0.124836 13.0308 0.12484 9.47313 1.70948 6.45344C3.60612 2.84079 7.46918 0.56322 11.6935 0.56322C14.4687 0.531806 17.1494 1.52921 19.1692 3.34339L15.9794 6.39451Z'
                              fill='#6ECEDA'
                            />
                          </g>
                          <defs>
                            <clipPath id='clip0_185_2250'>
                              <rect
                                width='22.3451'
                                height='21.3735'
                                fill='white'
                                transform='translate(0.297363 0.5625)'
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </Link>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className='pt-4 border-t border-gray-200'>
                    <h4 className='text-sm font-medium text-gray-700 mb-3'>
                      Business Hours
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
                        <span>Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
