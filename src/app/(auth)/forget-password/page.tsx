"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";

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
  const [isSuccess, setIsSuccess] = useState(false);

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
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate password reset logic
          if (formData.email === "nonexistent@example.com") {
            reject(new Error("Email not found"));
          } else {
            resolve("success");
          }
        }, 2000);
      });

      // Handle successful password reset request
      setIsSuccess(true);
      console.log("Password reset email sent to:", formData.email);
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

  const handleResendEmail = () => {
    setIsSuccess(false);
    setFormData({ email: "" });
    setErrors({});
  };

  if (isSuccess) {
    return (
      <div className='min-h-screen bg-white flex'>
        {/* Left Side - Success Message */}
        <div className='flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8'>
          <div className='max-w-md w-full text-center space-y-8'>
            {/* Success Icon */}
            <div className='mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center'>
              <CheckCircle className='w-8 h-8 text-green-600' />
            </div>

            {/* Success Message */}
            <div>
              <h1 className='text-3xl lg:text-4xl font-bold text-gray-900 mb-4'>
                Check your email
              </h1>
              <p className='text-gray-600 text-lg mb-2'>
                We&apos;ve sent password reset instructions to:
              </p>
              <p className='text-gray-900 font-medium text-lg mb-6'>
                {formData.email}
              </p>
              <p className='text-gray-600'>
                Didn&apos;t receive the email? Check your spam folder or try
                again.
              </p>
            </div>

            {/* Action Buttons */}
            <div className='space-y-4'>
              <button
                onClick={handleResendEmail}
                className='w-full py-3 px-4 bg-teal-500 text-white font-medium rounded-full hover:bg-teal-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2'
              >
                Try another email
              </button>

              <Link
                href='/login'
                className='w-full inline-flex items-center justify-center py-3 px-4 border-2 border-gray-200 text-gray-700 font-medium rounded-full hover:border-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
              >
                <ArrowLeft className='w-4 h-4 mr-2' />
                Back to login
              </Link>
            </div>

            {/* Email Instructions */}
            <div className='bg-blue-50 rounded-lg p-4 text-left'>
              <h3 className='text-sm font-medium text-blue-900 mb-2'>
                What&apos;s next?
              </h3>
              <ul className='text-sm text-blue-800 space-y-1'>
                <li>• Check your email inbox and spam folder</li>
                <li>• Click the reset link in the email</li>
                <li>• Create a new secure password</li>
                <li>• Log in with your new password</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Side - Illustration */}
        <div className='hidden lg:flex flex-1 items-center justify-center bg-gray-50 p-8'>
          <div className='max-w-lg'>
            <Image
              src='/images/cleaner-illustration.png'
              alt='Professional cleaner with tools'
              width={500}
              height={600}
              className='w-full h-auto'
              priority
            />
          </div>
        </div>
      </div>
    );
  }

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
            <Link href='/login' className='text-teal-500 font-medium hover:text-teal-600 transition-colors'>
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
