"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useVerifyOtpMutation } from "@/redux/features/auth/authAPI";
import { toast } from "sonner";

interface VerificationState {
  code: string[];
  email: string;
  isLoading: boolean;
  isResending: boolean;
  error: string;
  timeLeft: number;
  canResend: boolean;
}

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "creativeitem@gmail.com";

  const [state, setState] = useState<VerificationState>({
    code: ["", "", "", "", "", ""], // 6-digit code
    email,
    isLoading: false,
    isResending: false,
    error: "",
    timeLeft: 60,
    canResend: false,
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [verifyOtp] = useVerifyOtpMutation();
  const router = useRouter();

  // Countdown timer for resend functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (state.timeLeft > 0 && !state.canResend) {
      interval = setInterval(() => {
        setState((prev) => ({
          ...prev,
          timeLeft: prev.timeLeft - 1,
        }));
      }, 1000);
    } else if (state.timeLeft === 0) {
      setState((prev) => ({
        ...prev,
        canResend: true,
      }));
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state.timeLeft, state.canResend]);

  const handleInputChange = (index: number, value: string) => {
    // Only allow single digits
    if (value.length > 1) return;

    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...state.code];
    newCode[index] = value;

    setState((prev) => ({
      ...prev,
      code: newCode,
      error: "", // Clear error when user starts typing
    }));

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Handle backspace
    if (e.key === "Backspace" && !state.code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Handle paste
    if ((e.ctrlKey || e.metaKey) && e.key === "v") {
      e.preventDefault();
      navigator.clipboard.readText().then((text) => {
        const digits = text.replace(/\D/g, "").slice(0, 6).split("");
        const newCode = [...state.code];

        digits.forEach((digit, i) => {
          if (i < 6) newCode[i] = digit;
        });

        setState((prev) => ({ ...prev, code: newCode }));

        // Focus the next empty input or the last input
        const nextEmptyIndex = newCode.findIndex((code) => !code);
        const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
        inputRefs.current[focusIndex]?.focus();
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const codeString = state.code.join("");

    if (codeString.length !== 6) {
      setState((prev) => ({
        ...prev,
        error: "Please enter the complete 6-digit code",
      }));
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: "" }));

    try {
      const response = await verifyOtp({
        email,
        oneTimeCode: Number(codeString),
      }).unwrap();

      if (response?.success) {
        toast.success("Verification successful!");
        router.push("/login");
      }
      // Handle successful verification
      setIsSuccess(true);
    } catch (error) {
      if (error instanceof Error) {
        setState((prev) => ({ ...prev, error: error.message }));
      } else {
        setState((prev) => ({
          ...prev,
          error: "Verification failed. Please try again.",
        }));
      }
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleResendCode = async () => {
    setState((prev) => ({ ...prev, isResending: true, error: "" }));

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Reset state for new code
      setState((prev) => ({
        ...prev,
        code: ["", "", "", "", "", ""],
        isResending: false,
        timeLeft: 60,
        canResend: false,
      }));

      // Focus first input
      inputRefs.current[0]?.focus();
    } catch {
      setState((prev) => ({
        ...prev,
        isResending: false,
        error: "Failed to resend code. Please try again.",
      }));
    }
  };

  // Success state
  if (isSuccess) {
    return (
      <div className='min-h-screen bg-white flex'>
        <div className='flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8'>
          <div className='max-w-md w-full text-center space-y-8'>
            <div className='mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center'>
              <CheckCircle className='w-8 h-8 text-green-600' />
            </div>
            <div>
              <h1 className='text-3xl lg:text-4xl font-bold text-gray-900 mb-4'>
                Email Verified!
              </h1>
              <p className='text-gray-600 text-lg mb-6'>
                Your email has been successfully verified. You can now access
                all features of your account.
              </p>
            </div>
            <Link
              href='/login'
              className='w-full inline-flex items-center justify-center py-3 px-4 bg-teal-500 text-white font-medium rounded-full hover:bg-teal-600 transition-colors duration-200'
            >
              Continue to Login
            </Link>
          </div>
        </div>
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

  console.log(email, "email", typeof state.code.join(""), "code");
  return (
    <div className='min-h-screen bg-white flex'>
      {/* Left Side - Verification Form */}
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
              Verify Your Email
            </h1>
            <p className='text-gray-600 text-lg'>
              Enter the 6 digit code sent to{" "}
              <span className='font-medium text-gray-900'>{state.email}</span>
            </p>
          </div>

          {/* Verification Form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Error Message */}
            {state.error && (
              <div className='bg-red-50 border border-red-200 rounded-lg p-3'>
                <p className='text-sm text-red-600'>{state.error}</p>
              </div>
            )}

            {/* OTP Input */}
            <div>
              <div className='flex items-center justify-center space-x-3 mb-4'>
                {state.code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type='text'
                    inputMode='numeric'
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={`
                      w-16 h-16 text-center text-2xl font-bold rounded-2xl border-2 transition-colors duration-200
                      focus:outline-none focus:ring-0
                      ${
                        state.error
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-blue-500"
                      }
                      ${digit ? "bg-gray-50" : "bg-white"}
                    `}
                    placeholder='0'
                  />
                ))}
              </div>

              {/* Resend Code Section */}
              {/* <div className='text-center mt-4'>
                {state.canResend ? (
                  <button
                    type='button'
                    onClick={handleResendCode}
                    disabled={state.isResending}
                    className={`text-teal-600 hover:text-teal-700 font-medium transition-colors duration-200
                      ${
                        state.isResending ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                  >
                    {state.isResending ? (
                      <span className='flex items-center justify-center'>
                        <RefreshCw className='w-4 h-4 mr-2 animate-spin' />
                        Resending...
                      </span>
                    ) : (
                      "Resend verification code"
                    )}
                  </button>
                ) : (
                  <p className='text-gray-500 text-sm'>
                    Resend code in {state.timeLeft} seconds
                  </p>
                )}
              </div> */}
            </div>

            {/* Verify Button */}
            <button
              type='submit'
              disabled={state.isLoading || state.code.join("").length !== 6}
              className={`
                w-full py-3 px-4 rounded-full font-medium transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
                ${
                  state.isLoading || state.code.join("").length !== 6
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-teal-500 hover:bg-teal-600 text-white transform hover:scale-[1.02]"
                }
              `}
            >
              {state.isLoading ? "Verifying..." : "Verify"}
            </button>
          </form>

          {/* Change Email */}
          <div className='text-center'>
            <p className='text-gray-600 mb-2'>Wrong email address?</p>
            <Link
              href='/signup'
              className='text-teal-600 hover:text-teal-700 font-medium transition-colors duration-200'
            >
              Change email address
            </Link>
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
