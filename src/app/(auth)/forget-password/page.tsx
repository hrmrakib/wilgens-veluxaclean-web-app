"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { useForgotPasswordMutation } from "@/redux/features/auth/authAPI";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ForgotPasswordFormData {
  email: string;
}

interface FormErrors {
  email?: string;
  general?: string;
}

export default function ForgotPasswordPage() {
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();
  const router = useRouter();
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

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

    setIsLoading(true);
    setErrors({});

    try {
      const response = await forgotPassword(formData).unwrap();

      if (response?.success) {
        toast.success(response?.message);
        router.push("/verify-email/?email=" + formData.email);
      }

      // Handle successful password reset request
    } catch (error) {
      if (error instanceof Error && error.message === "Email not found") {
        setErrors({ email: "No account found with this email address." });
      } else {
        setErrors({ general: "Failed to send reset email. Please try again." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (value: string) => {
    setFormData({ email: value });
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  return (
    <div className='min-h-screen bg-white flex'>
      {/* Left Side - Forgot Password Form */}
      <div className='flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
          {/* Back to Login Link */}
          <Link
            href='/login'
            className='inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to login
          </Link>

          {/* Header */}
          <div className='text-center lg:text-left'>
            <h1 className='text-4xl lg:text-5xl font-bold text-gray-900 mb-2'>
              Forgot Password?
            </h1>
            <p className='text-gray-600 text-lg'>
              No worries, we&apos;ll send you reset instructions.
            </p>
          </div>

          {/* Forgot Password Form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* General Error */}
            {errors.general && (
              <div className='bg-red-50 border border-red-200 rounded-lg p-3'>
                <p className='text-sm text-red-600'>{errors.general}</p>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Email
              </label>
              <div className='relative'>
                <input
                  type='email'
                  id='email'
                  value={formData.email}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder='creativeitem@gmail.com'
                  className={`
                    w-full px-4 py-3 pl-12 rounded-full border-2 transition-colors duration-200
                    focus:outline-none focus:ring-0
                    ${
                      errors.email
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-blue-500"
                    }
                  `}
                />
                <Mail className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
              </div>
              {errors.email && (
                <p className='mt-1 text-sm text-red-600'>{errors.email}</p>
              )}
            </div>

            {/* Reset Password Button */}
            <button
              type='submit'
              disabled={isLoading}
              className={`
                w-full py-3 px-4 rounded-full font-medium transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
                ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-teal-500 hover:bg-teal-600 text-white transform hover:scale-[1.02]"
                }
              `}
            >
              {isLoading ? "Sending..." : "Reset Password"}
            </button>
          </form>

          {/* Login Options */}
          <div className='text-center flex justify-center gap-1'>
            <p className='text-gray-600 mb-4'>Remember your password?</p>
            <Link
              href='/login'
              className='text-teal-500 font-medium hover:text-teal-600 transition-colors'
            >
              Login
            </Link>
            <p>instead</p>
          </div>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className='hidden lg:flex flex-1 items-center justify-center bg-[#FFFFFF] p-8'>
        <div className='max-w-xl'>
          <Image
            src='/auth/auth-img.png'
            alt='Professional cleaner with tools'
            width={600}
            height={700}
            className='w-full h-auto'
            priority
          />
        </div>
      </div>
    </div>
  );
}
