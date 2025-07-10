"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useResetPasswordMutation } from "@/redux/features/auth/authAPI";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface LoginFormData {
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  password?: string;
  confirmPassword?: string;
}

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [resetPassword] = useResetPasswordMutation();
  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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
      const response = await resetPassword({
        newPassword: formData.password,
        confirmPassword: formData.confirmPassword,
      }).unwrap();


      console.log(response)
      if (response?.success) {
        localStorage.setItem("accessToken", response?.data?.accessToken);
        localStorage.setItem("refreshToken", response?.data?.refreshToken);
        localStorage.setItem(
          "VeluxaCleanUser",
          JSON.stringify(response?.data?.user)
        );
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
    } finally {
      setIsLoading(false);
    }
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

  console.log(formData.password, formData.confirmPassword);

  return (
    <div className='min-h-screen bg-white flex'>
      {/* Left Side - Login Form */}
      <div className='flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
          {/* Header */}
          <div className='text-center lg:text-left'>
            <h1 className='text-4xl lg:text-5xl font-bold text-gray-900 mb-2'>
              Reset Password
            </h1>
            <p className='text-gray-600 text-lg'>
              Your new password must be different from previously used password
            </p>
          </div>

          {/* Reset Password Form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
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

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor='confirm-password'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Confirm Password
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? "text" : "password"}
                  id='confirm-password'
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
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

            {formData.password !== formData.confirmPassword ? (
              <p className='text-red-600'>Passwords do not match</p>
            ) : (
              <p className='text-green-600'>Passwords match</p>
            )}
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
              {isLoading ? "Changing password..." : "Change Password"}
            </button>
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
