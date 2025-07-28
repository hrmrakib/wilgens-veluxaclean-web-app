"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useSignupMutation } from "@/redux/features/auth/authAPI";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  general?: string;
}

export default function SignupPage() {
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signup] = useSignupMutation();
  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 8 characters";
    }
    // else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
    //   newErrors.password =
    //     "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const response = await signup(formData).unwrap();

      if (response?.success) {
        toast.success(response?.message);
        router.push("/verify-otp/?email=" + formData.email);
      }

      console.log("Registration successful!", response);
    } catch (error) {
      if (error instanceof Error && error.message === "Email already exists") {
        setErrors({
          email:
            "This email is already registered. Please use a different email or log in.",
        });
      } else {
        setErrors({ general: "Registration failed. Please try again." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof SignupFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const getPasswordStrength = (
    password: string
  ): { strength: string; color: string } => {
    if (password.length === 0) return { strength: "", color: "" };
    if (password.length < 8) return { strength: "Weak", color: "text-red-500" };
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password))
      return { strength: "Medium", color: "text-yellow-500" };
    return { strength: "Strong", color: "text-green-500" };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className='min-h-screen bg-white flex'>
      {/* Left Side - Signup Form */}
      <div className='flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
          {/* Header */}
          <div className='text-center lg:text-left'>
            <h1 className='text-4xl lg:text-5xl font-bold text-gray-900 mb-2'>
              Sign Up
            </h1>
            <p className='text-gray-600 text-lg'>
              See your growth and get consulting support!
            </p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* General Error */}
            {errors.general && (
              <div className='bg-red-50 border border-red-200 rounded-lg p-3'>
                <p className='text-sm text-red-600'>{errors.general}</p>
              </div>
            )}

            {/* Name Field */}
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Name
              </label>
              <input
                type='text'
                id='name'
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder='Your name'
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

            {/* Email Field */}
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder='creativeitem@gmail.com'
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
                <p className='mt-1 text-sm text-red-600'>{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Password
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? "text" : "password"}
                  id='password'
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  placeholder='Min 8 character'
                  className={`
                    w-full px-4 py-3 pr-12 rounded-full border-2 transition-colors duration-200
                    focus:outline-none focus:ring-0
                    ${
                      errors.password
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-blue-500"
                    }
                  `}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                >
                  {showPassword ? (
                    <EyeOff className='w-5 h-5' />
                  ) : (
                    <Eye className='w-5 h-5' />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className='mt-2 flex items-center space-x-2'>
                  <div className='flex space-x-1'>
                    <div
                      className={`h-1 w-8 rounded ${
                        formData.password.length >= 8
                          ? "bg-green-500"
                          : "bg-gray-200"
                      }`}
                    />
                    <div
                      className={`h-1 w-8 rounded ${
                        /(?=.*[a-z])(?=.*[A-Z])/.test(formData.password)
                          ? "bg-green-500"
                          : "bg-gray-200"
                      }`}
                    />
                    <div
                      className={`h-1 w-8 rounded ${
                        /(?=.*\d)/.test(formData.password)
                          ? "bg-green-500"
                          : "bg-gray-200"
                      }`}
                    />
                  </div>
                  {passwordStrength.strength && (
                    <span
                      className={`text-xs font-medium ${passwordStrength.color}`}
                    >
                      {passwordStrength.strength}
                    </span>
                  )}
                </div>
              )}

              {errors.password && (
                <p className='mt-1 text-sm text-red-600'>{errors.password}</p>
              )}
            </div>

            {/* Sign Up Button */}
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
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>

            {/* Login Link */}
            <p className='text-center text-gray-600'>
              Already registered?{" "}
              <Link
                href='/login'
                className='text-gray-900 font-medium hover:text-blue-600 transition-colors'
              >
                Log in
              </Link>
            </p>
          </form>
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
