/* eslint-disable prefer-const */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCreateBookingMutation } from "@/redux/features/booking/bookingAPI";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useCreatePaymentMutation } from "@/redux/features/payment/paymentAPI";

interface FormData {
  name: string;
  email: string;
  date: string;
  time: string;
  period: "AM" | "PM";
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  date?: string;
  time?: string;
  message?: string;
  period?: string;
}

export default function BookingPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    date: "",
    time: "",
    period: "AM",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const params = useParams();
  const [createBooking] = useCreateBookingMutation();
  const [createPayment] = useCreatePaymentMutation();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    if (!formData.time) {
      newErrors.time = "Time is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const convertTo24Hour = (time: string, period: "AM" | "PM") => {
    let [hours, minutes] = time.split(":").map(Number);
    if (period === "PM" && hours < 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:00Z`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const res = await createBooking({
        service: params?.slug,
        name: formData?.name,
        email: formData?.email,
        date: new Date(
          `${formData.date}T${convertTo24Hour(formData.time, formData.period)}`
        ).toISOString(),
        time: `${formData.time} ${formData.period}`,
        description: formData?.message,
      });

      console.log(res);

      if (res?.data?.success) {
        toast.success(res?.data?.message);

        const paymentRes = await createPayment({
          service: params?.slug,
        });

        // if (paymentRes?.data?.url) {
        //   window.open(paymentRes?.data?.url, "_blank");
        // }
        if (paymentRes?.data?.url) {
          window.location.href = paymentRes?.data?.url;
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          date: "",
          time: "",
          period: "AM",
          message: "",
        });
      }, 3000);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 1; hour <= 12; hour++) {
      for (let minute of ["00", "30"]) {
        const timeStr = `${hour}:${minute}`;
        times.push(timeStr);
      }
    }
    return times;
  };

  return (
    <div className='lg:absolute lg:top-32 lg:-right-44 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 max-w-md'>
      <Card className='shadow-lg border-0 p-6'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold text-gray-900'>
            Book Now
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-5'>
            {/* Name Field */}
            <div className='space-y-2'>
              <Input
                id='name'
                type='text'
                placeholder='Enter your name'
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={cn(
                  "h-12 px-4 border border-gray-200 focus:border-teal-500 focus:ring-teal-500",
                  errors.name &&
                    "border-red-500 focus:border-red-500 focus:ring-red-500"
                )}
              />
              {errors.name && (
                <p className='text-sm text-red-600'>{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div className='space-y-2'>
              <Input
                id='email'
                type='email'
                placeholder='Enter your email'
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={cn(
                  "h-12 px-4 border border-gray-200 focus:border-teal-500 focus:ring-teal-500",
                  errors.email &&
                    "border-red-500 focus:border-red-500 focus:ring-red-500"
                )}
              />
              {errors.email && (
                <p className='text-sm text-red-600'>{errors.email}</p>
              )}
            </div>

            {/* Date and Time Row */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              {/* Date Field */}
              <div className='space-y-2'>
                <Label
                  htmlFor='date'
                  className='text-sm font-medium text-gray-700 flex items-center gap-2'
                >
                  <Calendar className='w-4 h-4' />
                  Date
                </Label>
                <Input
                  id='date'
                  type='date'
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className={cn(
                    "h-12 px-4 border border-gray-200 focus:border-teal-500 focus:ring-teal-500",
                    errors.date &&
                      "border-red-500 focus:border-red-500 focus:ring-red-500"
                  )}
                />
                {errors.date && (
                  <p className='text-sm text-red-600'>{errors.date}</p>
                )}
              </div>

              {/* Time Field */}
              <div className='space-y-2'>
                <Label className='text-sm font-medium text-gray-700 flex items-center gap-2'>
                  <Clock className='w-4 h-4' />
                  Time
                </Label>
                <div className='flex gap-2'>
                  <Select
                    value={formData.time}
                    onValueChange={(value: string) =>
                      handleInputChange("time", value)
                    }
                  >
                    <SelectTrigger
                      className={cn(
                        "!h-12 flex-1 border border-gray-200 focus:border-teal-500 focus:ring-teal-500",
                        errors.time &&
                          "border-red-500 focus:border-red-500 focus:ring-red-500"
                      )}
                    >
                      <SelectValue placeholder='Select time' />
                    </SelectTrigger>
                    <SelectContent className='overflow-y-auto'>
                      {generateTimeOptions().map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={formData.period}
                    onValueChange={(value: "AM" | "PM") =>
                      handleInputChange("period", value)
                    }
                  >
                    <SelectTrigger className='!h-12 w-20 border-gray-200 focus:border-teal-500 focus:ring-teal-500'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='AM'>AM</SelectItem>
                      <SelectItem value='PM'>PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {errors.time && (
                  <p className='text-sm text-red-600'>{errors.time}</p>
                )}
              </div>
            </div>

            {/* Message Field */}
            <div className='space-y-2'>
              <Label
                htmlFor='message'
                className='text-sm font-medium text-gray-700'
              >
                Additional Message (Optional)
              </Label>
              <Textarea
                id='message'
                placeholder='Write here...'
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                rows={10}
                className='h-10 resize-none border border-gray-200 focus:border-teal-500 focus:ring-teal-500'
              />
            </div>

            {/* Submit Button */}
            <Button
              type='submit'
              disabled={isSubmitting}
              className='w-full h-12 bg-[#6ECEDA] hover:bg-[#6ecddab9] text-[#4A4A4A] font-medium rounded-full transition-colors duration-200'
            >
              {isSubmitting ? (
                <div className='flex items-center gap-2'>
                  <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  Submitting...
                </div>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </CardContent>

        <div className='px-6'>
          <h2 className='text-2xl font-bold text-[#051625] mb-4'>
            Contact Details
          </h2>

          <div className='flex items-center gap-4 mb-5'>
            <div className='h-10'>
              <svg
                width='15'
                height='19'
                viewBox='0 0 15 19'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M7.40229 0.898455C9.33789 0.907036 11.1878 1.67785 12.5411 3.03106C13.9028 4.39283 14.6651 6.23422 14.6566 8.14413V8.18696C14.6051 10.782 13.1491 13.1716 11.3334 15.0386C10.3057 16.0921 9.1666 17.0256 7.92473 17.8136C7.59071 18.0962 7.10253 18.0962 6.76851 17.8136C4.92712 16.6145 3.29984 15.1072 1.98089 13.3514C0.824671 11.8269 0.165197 9.99409 0.0966797 8.08418C0.113809 4.10164 3.38549 0.889907 7.40229 0.898455ZM7.40229 5.97729C6.12617 5.97729 5.09841 6.99647 5.09841 8.26404C5.09841 9.51533 6.10904 10.5251 7.3766 10.5422H7.40229C8.01038 10.5422 8.59277 10.311 9.021 9.89131C9.46636 9.45452 9.71559 8.87298 9.71559 8.26404C9.71559 6.99647 8.67842 5.97729 7.40229 5.97729Z'
                  fill='#6ECEDA'
                />
              </svg>
            </div>
            <div>
              <p className='text-base text-[#838B95] leading-relaxed'>
                785 15th Street, Office 468
                <br />
                Berlin, De 845612
              </p>
            </div>
          </div>
          <div className='flex items-center gap-4 mb-5'>
            <div>
              <svg
                width='17'
                height='16'
                viewBox='0 0 17 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M12.3103 0.707031C13.4066 0.707031 14.4613 1.14034 15.2371 1.91784C16.0138 2.69371 16.4479 3.74019 16.4479 4.83572V11.2945C16.4479 13.5755 14.5921 15.4232 12.3103 15.4232H4.23355C1.95173 15.4232 0.0966797 13.5755 0.0966797 11.2945V4.83572C0.0966797 2.55472 1.94355 0.707031 4.23355 0.707031H12.3103ZM13.611 6.05389L13.6764 5.98849C13.8718 5.75139 13.8718 5.40802 13.6674 5.17092C13.5538 5.04911 13.3976 4.97471 13.2349 4.95836C13.0632 4.94936 12.8997 5.00741 12.7763 5.12187L9.08987 8.0651C8.61568 8.45834 7.93629 8.45834 7.45475 8.0651L3.77571 5.12187C3.52145 4.93383 3.1699 4.95836 2.95815 5.1791C2.73741 5.39984 2.71288 5.75139 2.9001 5.99666L3.0072 6.10295L6.72712 9.00529C7.18495 9.36502 7.74007 9.56124 8.32136 9.56124C8.90101 9.56124 9.46595 9.36502 9.92297 9.00529L13.611 6.05389Z'
                  fill='#6ECEDA'
                />
              </svg>
            </div>
            <div>
              <p className='text-base text-[#838B95] leading-relaxed'>
                creativeitem@gmail.com
              </p>
            </div>
          </div>
          <div className='flex items-center gap-4 mb-5'>
            <div>
              <svg
                width='17'
                height='17'
                viewBox='0 0 17 17'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M13.3159 10.3291C12.7666 10.211 12.3321 10.466 11.9474 10.6888C11.5534 10.9182 10.8042 11.526 10.3748 11.3704C8.17614 10.4652 6.10832 8.54081 5.21317 6.33335C5.05541 5.89475 5.66032 5.1408 5.88812 4.74216C6.10916 4.35625 6.35889 3.91766 6.24499 3.36431C6.14206 2.86706 4.81074 1.17302 4.33997 0.709778C4.02949 0.40378 3.71143 0.235479 3.38493 0.208275C2.15737 0.155576 0.786398 1.79352 0.545953 2.18537C-0.0564348 3.02091 -0.0530579 4.13271 0.556076 5.4808C2.02408 9.10182 7.57629 14.5664 11.2108 16.0896C11.8816 16.4032 12.4949 16.5605 13.0459 16.5605C13.585 16.5605 14.065 16.41 14.4776 16.1117C14.7889 15.9323 16.494 14.4933 16.4493 13.2328C16.4223 12.9114 16.2544 12.5902 15.9524 12.279C15.4925 11.8039 13.8094 10.4329 13.3159 10.3291Z'
                  fill='#6ECEDA'
                />
              </svg>
            </div>
            <div>
              <p className='text-base text-[#838B95] leading-relaxed'>
                +45654121344
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
