"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Check } from "lucide-react";
import { useLoginMutation } from "@/redux/features/auth/authAPI";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: true,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [login] = useLoginMutation();
  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
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
      const response = await login({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      if (response?.success) {
        localStorage.setItem("accessToken", response?.data?.accessToken);
        localStorage.setItem("refreshToken", response?.data?.refreshToken);
        localStorage.setItem("VeluxaCleanUser", JSON.stringify(response?.data?.user));
        toast.success(response?.message);
        router.push("/");
      }
      console.log("Login successful!", response);
    } catch (error: unknown) {
      if (
        error &&
        typeof error === "object" &&
        "data" in error &&
        error.data &&
        typeof error.data === "object" &&
        "message" in (error.data as { message?: string })
      ) {
        toast.error(
          (error as { data: { message?: string } }).data.message ||
            "An error occurred."
        );
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred.");
      }

      setErrors({ general: "Invalid email or password. Please try again." });
    } finally {
      setIsLoading(false);
    }

    // catch (error) {
    //   toast.error(error?.data?.message);
    //   setErrors({ general: "Invalid email or password. Please try again." });
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const handleInputChange = (
    field: keyof LoginFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSocialLogin = (provider: "google" | "apple") => {
    console.log(`Login with ${provider}`);
    // Implement social login logic here
  };

  console.log(formData.email, formData.password);

  return (
    <div className='min-h-screen bg-white flex'>
      {/* Left Side - Login Form */}
      <div className='flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
          {/* Header */}
          <div className='text-center lg:text-left'>
            <h1 className='text-4xl lg:text-5xl font-bold text-gray-900 mb-2'>
              Log in
            </h1>
            <p className='text-gray-600 text-lg'>
              See your growth and get consulting support!
            </p>
          </div>

          {/* Login Form */}
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
              {errors.password && (
                <p className='mt-1 text-sm text-red-600'>{errors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className='flex items-center justify-between'>
              <label className='flex items-center cursor-pointer'>
                <div className='relative'>
                  <input
                    type='checkbox'
                    checked={formData.rememberMe}
                    onChange={(e) =>
                      handleInputChange("rememberMe", e.target.checked)
                    }
                    className='sr-only'
                  />
                  <div
                    className={`
                      w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-200
                      ${
                        formData.rememberMe
                          ? "bg-teal-500 border-teal-500 text-white"
                          : "border-gray-300 hover:border-gray-400"
                      }
                    `}
                  >
                    {formData.rememberMe && <Check className='w-3 h-3' />}
                  </div>
                </div>
                <span className='ml-2 text-sm text-gray-700'>Remember me</span>
              </label>

              <Link
                href='/forget-password'
                className='text-sm text-green-600 hover:text-green-700 transition-colors'
              >
                Forget Password?
              </Link>
            </div>

            {/* Login Button */}
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
              {isLoading ? "Logging in..." : "Log in"}
            </button>

            {/* Create Account Link */}
            <p className='text-center text-gray-600'>
              Not have an account yet?{" "}
              <Link
                href='/signup'
                className='text-gray-900 font-medium hover:text-blue-600 transition-colors'
              >
                Create Account
              </Link>
            </p>

            {/* Divider */}
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-gray-200' />
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-4 bg-white text-gray-500'>Or</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className='space-y-3'>
              <button
                type='button'
                onClick={() => handleSocialLogin("google")}
                className='w-full flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-full hover:border-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
              >
                <svg className='w-5 h-5 mr-3' viewBox='0 0 24 24'>
                  <path
                    fill='#4285F4'
                    d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                  />
                  <path
                    fill='#34A853'
                    d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                  />
                  <path
                    fill='#FBBC05'
                    d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                  />
                  <path
                    fill='#EA4335'
                    d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                  />
                </svg>
                <span className='text-gray-700 font-medium'>
                  Sign in with Google
                </span>
              </button>

              <button
                type='button'
                onClick={() => handleSocialLogin("apple")}
                className='w-full flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-full hover:border-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
              >
                <svg
                  className='w-5 h-5 mr-3'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z' />
                </svg>
                <span className='text-gray-700 font-medium'>
                  Continue with Apple
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className='hidden lg:flex flex-1 items-center justify-center bg-[#FFFFFF] p-8'>
        <div className='w-2xl'>
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
