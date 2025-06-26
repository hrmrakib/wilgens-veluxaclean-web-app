/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  MoreHorizontal,
  ThumbsUp,
} from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  featured?: boolean;
}

interface Comment {
  id: number;
  author: string;
  avatar: string;
  date: string;
  time: string;
  text: string;
  replies?: number;
}

interface ReviewFormData {
  rating: number;
  review: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alexa Bliss",
    avatar: "/testi.png",
    rating: 5,
    text: "Training programs can bring you a super exciting experience of learning through online! You never face any negative experience while enjoying your classes Awesome. site, on the top advertising a Courses available business listing.",
    featured: true,
  },
  {
    id: 2,
    name: "John Smith",
    avatar: "/testi.png",
    rating: 5,
    text: "Excellent service! The cleaning team was professional and thorough. My house has never looked better.",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    avatar: "/testi.png",
    rating: 4,
    text: "Great experience overall. The staff was friendly and the cleaning quality exceeded my expectations.",
  },
  {
    id: 4,
    name: "Mike Wilson",
    avatar: "/testi.png",
    rating: 5,
    text: "Highly recommend! They arrived on time and did an amazing job. Will definitely book again.",
  },
  {
    id: 5,
    name: "Emma Davis",
    avatar: "/testi.png",
    rating: 5,
    text: "Professional service with attention to detail. The team was courteous and efficient.",
  },
];

const comments: Comment[] = [
  {
    id: 1,
    author: "Taylor Swift",
    avatar: "/testi.png",
    date: "January 9, 2022",
    time: "7:18 pm",
    text: "Many remote jobs also come with flexible schedules, which means that workers can start and end their day as they choose, as long as their work",
  },
  {
    id: 2,
    author: "Amber Ross",
    avatar: "/testi.png",
    date: "January 9, 2022",
    time: "7:06 pm",
    text: "Many remote jobs also come with flexible schedules, which means that workers can start and end their day as they choose, as long as their work",
    replies: 1,
  },
];

export default function ServiceReviewSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [formData, setFormData] = useState<ReviewFormData>({
    rating: 0,
    review: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handlePrevTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNextTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.rating === 0 || !formData.review.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmitStatus("success");
      setFormData({ rating: 0, review: "" });

      // Reset success message after 3 seconds
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } catch (error) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating: number, size: "sm" | "md" = "md") => {
    const starSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";
    return (
      <div className='flex items-center space-x-1'>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const currentTestimonialData = testimonials[currentTestimonial];

  return (
    <div className='min-h-screen bg-[#FFFFFF] py-8 lg:py-16'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl'>
        {/* Testimonials Section */}
        <div className='bg-[#FFFFFF] rounded-2xl p-6 lg:p-8 mb-8'>
          {/* Customer Avatars */}
          <div className='flex justify-center items-center space-x-2 mb-8'>
            {testimonials.slice(0, 5).map((testimonial, index) => (
              <button
                key={testimonial.id}
                onClick={() => setCurrentTestimonial(index)}
                className={`relative rounded-full overflow-hidden transition-all duration-200 ${
                  index === currentTestimonial
                    ? "ring-4 ring-cyan-500 ring-offset-2 scale-110"
                    : "hover:scale-105 opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className='w-12 h-12 object-cover'
                />
              </button>
            ))}
          </div>

          {/* Featured Testimonial */}
          <div className='relative text-center'>
            <h3 className='text-xl font-bold text-gray-900 mb-2'>
              {currentTestimonialData.name}
            </h3>
            <div className='flex justify-center mb-4'>
              {renderStars(currentTestimonialData.rating)}
            </div>
            <blockquote className='text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto mb-6'>
              &quot;{currentTestimonialData.text}&quot;
            </blockquote>

            {/* Navigation */}
            <div className='flex justify-center items-center space-x-4'>
              <button
                onClick={handlePrevTestimonial}
                className=' p-2 rounded-full bg-[#15B2F5] transition-colors duration-200'
                aria-label='Previous testimonial'
              >
                <ChevronLeft className='w-5 h-5 text-white' />
              </button>

              <div className='flex space-x-2'>
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                      index === currentTestimonial
                        ? "bg-cyan-500"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextTestimonial}
                className=' p-2 rounded-full bg-[#15B2F5] hover:bg-cyan-600 transition-colors duration-200'
                aria-label='Next testimonial'
              >
                <ChevronRight className='w-5 h-5 text-white' />
              </button>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className='bg-[#FFFFFF] rounded-2xl p-6 lg:p-8 mb-8'>
          <h2 className='text-2xl font-bold text-gray-900 mb-6'>
            {comments.length} Comments
          </h2>

          <div className='space-y-6'>
            {comments.map((comment) => (
              <div key={comment.id} className='flex space-x-4'>
                <Image
                  src={comment.avatar || "/placeholder.svg"}
                  alt={comment.author}
                  width={48}
                  height={48}
                  className='w-12 h-12 rounded-full object-cover flex-shrink-0'
                />

                <div className='flex-1'>
                  <div className='flex items-center justify-between mb-2'>
                    <div>
                      <h4 className='font-semibold text-gray-900'>
                        {comment.author}
                      </h4>
                      <p className='text-sm text-gray-500'>
                        {comment.date} • {comment.time}
                      </p>
                    </div>
                    <button className='p-1 hover:bg-gray-100 rounded transition-colors duration-200'>
                      <MoreHorizontal className='w-4 h-4 text-gray-400' />
                    </button>
                  </div>

                  <p className='text-gray-700 mb-3'>{comment.text}</p>

                  <div className='flex items-center space-x-4'>
                    <button className='flex items-center space-x-1 text-sm text-gray-500 hover:text-cyan-600 transition-colors duration-200'>
                      <ThumbsUp className='w-4 h-4' />
                      <span>Like</span>
                    </button>
                    <button className='px-4 py-1 bg-cyan-500 text-white text-sm rounded-full hover:bg-cyan-600 transition-colors duration-200'>
                      Reply
                    </button>
                  </div>

                  {/* {comment.replies && (
                    <button className='mt-3 text-sm text-cyan-600 hover:text-cyan-700 transition-colors duration-200'>
                      View {comment.replies} more reply...
                    </button>
                  )} */}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Review Form */}
        <div className='bg-[#FFFFFF] rounded-2xl p-6 lg:p-8'>
          <h2 className='text-2xl font-bold text-gray-900 mb-6'>
            Edit Your Review
          </h2>

          <form onSubmit={handleSubmitReview} className='space-y-6'>
            {/* Success/Error Messages */}
            {submitStatus === "success" && (
              <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
                <p className='text-sm text-green-600 font-medium'>
                  Thank you for your review!
                </p>
              </div>
            )}

            {submitStatus === "error" && (
              <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
                <p className='text-sm text-red-600 font-medium'>
                  Failed to submit review. Please try again.
                </p>
              </div>
            )}

            {/* Rating */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Rating
              </label>
              <div className='flex items-center space-x-2'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type='button'
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, rating: star }))
                    }
                    className='transition-colors duration-200'
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= formData.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300 hover:text-yellow-400"
                      }`}
                    />
                  </button>
                ))}
                <span className='ml-2 text-sm text-gray-600'>
                  {formData.rating > 0
                    ? `${formData.rating} star${formData.rating > 1 ? "s" : ""}`
                    : "Select rating"}
                </span>
              </div>
            </div>

            {/* Review Text */}
            <div>
              <label
                htmlFor='review'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Review
              </label>
              <textarea
                id='review'
                rows={6}
                value={formData.review}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, review: e.target.value }))
                }
                placeholder='Write your Review'
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none'
              />
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              disabled={
                isSubmitting || formData.rating === 0 || !formData.review.trim()
              }
              className={`
                px-6 py-3 rounded-lg font-medium transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2
                ${
                  isSubmitting ||
                  formData.rating === 0 ||
                  !formData.review.trim()
                    ? "bg-[#6ECEDA] cursor-not-allowed"
                    : "bg-[#6ECEDA] hover:bg-[#6ECEDA] text-white"
                }
              `}
            >
              {isSubmitting ? "Uploading..." : "Upload Review"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
