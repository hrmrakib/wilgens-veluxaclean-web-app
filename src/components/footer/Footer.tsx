"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Testimonial", href: "/#testimonials-section" },
  ],
  support: [
    { name: "Terms & Condition", href: "/terms-condition" },
    { name: "Privacy policy", href: "/privacy-policy" },
    { name: "Trust and Safety", href: "/trust-and-safety" },
  ],
};

const socialLinks = [
  {
    name: "YouTube",
    icon: (
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M21.8392 5.15941C22.1799 5.51057 22.4218 5.94541 22.5406 6.42C22.8578 8.1787 23.0118 9.96295 23.0006 11.75C23.0069 13.5103 22.8529 15.2676 22.5406 17C22.4218 17.4746 22.1799 17.9094 21.8392 18.2606C21.4986 18.6118 21.0713 18.8668 20.6006 19C18.8806 19.46 12.0006 19.46 12.0006 19.46C12.0006 19.46 5.12057 19.46 3.40057 19C2.93939 18.8738 2.51855 18.6308 2.17872 18.2945C1.83888 17.9581 1.59153 17.5398 1.46057 17.08C1.14334 15.3213 0.989351 13.537 1.00057 11.75C0.991808 9.97631 1.14579 8.20556 1.46057 6.46C1.57936 5.98541 1.82129 5.55057 2.16192 5.19941C2.50255 4.84824 2.92982 4.59318 3.40057 4.46C5.12057 4 12.0006 4 12.0006 4C12.0006 4 18.8806 4 20.6006 4.42C21.0713 4.55318 21.4986 4.80824 21.8392 5.15941ZM15.5 11.75L9.75 15.02V8.47998L15.5 11.75Z'
          fill='white'
        />
      </svg>
    ),
    href: "https://youtube.com",
    color: "hover:text-red-400",
  },
  {
    name: "Instagram",
    icon: (
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z'
          fill='white'
        />
        <path
          d='M15.9997 11.3703C16.1231 12.2025 15.981 13.0525 15.5935 13.7993C15.206 14.5461 14.5929 15.1517 13.8413 15.53C13.0898 15.9082 12.2382 16.0399 11.4075 15.9062C10.5768 15.7726 9.80947 15.3804 9.21455 14.7855C8.61962 14.1905 8.22744 13.4232 8.09377 12.5925C7.96011 11.7619 8.09177 10.9102 8.47003 10.1587C8.84829 9.40716 9.45389 8.79404 10.2007 8.40654C10.9475 8.01904 11.7975 7.87689 12.6297 8.0003C13.4786 8.12619 14.2646 8.52176 14.8714 9.12861C15.4782 9.73545 15.8738 10.5214 15.9997 11.3703Z'
          stroke='#15B2F5'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M17.5 6.5H17.51'
          stroke='#15B2F5'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
    href: "https://instagram.com",
    color: "hover:text-pink-400",
  },
  {
    name: "Facebook",
    icon: (
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z'
          fill='white'
        />
      </svg>
    ),
    href: "https://facebook.com",
    color: "hover:text-blue-400",
  },
  {
    name: "Twitter",
    icon: (
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M23 3.00029C22.0424 3.67577 20.9821 4.1924 19.86 4.53029C19.2577 3.8378 18.4573 3.34698 17.567 3.12422C16.6767 2.90145 15.7395 2.95749 14.8821 3.28474C14.0247 3.612 13.2884 4.19469 12.773 4.95401C12.2575 5.71332 11.9877 6.61263 12 7.53029V8.53029C10.2426 8.57586 8.50127 8.1861 6.93101 7.39574C5.36074 6.60537 4.01032 5.43893 3 4.00029C3 4.00029 -1 13.0003 8 17.0003C5.94053 18.3983 3.48716 19.0992 1 19.0003C10 24.0003 21 19.0003 21 7.50029C20.9991 7.22174 20.9723 6.94388 20.92 6.67029C21.9406 5.66378 22.6608 4.393 23 3.00029Z'
          fill='white'
        />
      </svg>
    ),
    href: "https://twitter.com",
    color: "hover:text-blue-300",
  },
  {
    name: "Email",
    icon: (
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z'
          fill='white'
        />
        <path
          d='M22 6L12 13L2 6'
          stroke='#15B2F5'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
    href: "mailto:support@veluxaclean.com",
    color: "hover:text-yellow-400",
  },
];

const contactInfo = [
  {
    icon: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M15.4347 11.8713C14.7934 11.7334 14.2861 12.0311 13.8369 12.2912C13.3768 12.5591 12.5021 13.2687 12.0007 13.0871C9.43358 12.0302 7.01919 9.78326 5.97402 7.20582C5.78982 6.69371 6.49611 5.81341 6.76209 5.34795C7.02018 4.89737 7.31175 4.38526 7.17877 3.73918C7.05859 3.15859 5.50414 1.18063 4.95447 0.639742C4.59195 0.282459 4.22058 0.0859495 3.83936 0.0541861C2.40607 -0.00734526 0.805315 1.90512 0.524572 2.36264C-0.178777 3.33822 -0.174834 4.63636 0.536391 6.21039C2.25043 10.4383 8.7332 16.8187 12.9769 18.5972C13.7601 18.9634 14.4762 19.147 15.1195 19.147C15.7489 19.147 16.3094 18.9713 16.7912 18.6231C17.1546 18.4136 19.1455 16.7334 19.0933 15.2616C19.0618 14.8864 18.8658 14.5113 18.5131 14.148C17.9762 13.5932 16.011 11.9925 15.4347 11.8713Z'
          fill='white'
        />
      </svg>
    ),
    text: "267-248-1100",
    href: "tel:267-248-1100",
  },
  {
    icon: (
      <svg
        width='20'
        height='18'
        viewBox='0 0 20 18'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M14.2625 0.0537109C15.5428 0.0537109 16.7743 0.55971 17.6804 1.46764C18.5873 2.37367 19.0943 3.5957 19.0943 4.87502V12.4173C19.0943 15.0809 16.9271 17.2386 14.2625 17.2386H4.83086C2.16625 17.2386 0 15.0809 0 12.4173V4.87502C0 2.21137 2.1567 0.0537109 4.83086 0.0537109H14.2625ZM15.7814 6.29755L15.8578 6.22117C16.086 5.9443 16.086 5.54332 15.8473 5.26646C15.7146 5.1242 15.5323 5.03732 15.3423 5.01823C15.1418 5.00773 14.9508 5.07551 14.8067 5.20917L10.5019 8.64615C9.94813 9.10536 9.15476 9.10536 8.59243 8.64615L4.29622 5.20917C3.9993 4.98959 3.58877 5.01823 3.3415 5.276C3.08373 5.53378 3.05509 5.9443 3.27372 6.23072L3.39879 6.35483L7.74274 9.74407C8.27738 10.1641 8.92563 10.3933 9.60443 10.3933C10.2813 10.3933 10.941 10.1641 11.4747 9.74407L15.7814 6.29755Z'
          fill='#F1FAFB'
        />
      </svg>
    ),
    text: "VeluxaClean@gmail.com",
    href: "mailto:VeluxaClean@gmail.com",
  },
];

export default function Footer() {
  const [isVisible, setIsVisible] = React.useState(false);
  const pathname = usePathname();
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("footer");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const handleSocialClick = (href: string, name?: string) => {
    window.open(href, "_blank", "noopener,noreferrer");
    console.log(name);
  };

  const handleContactClick = (href: string) => {
    window.location.href = href;
  };

  if (
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forget-password" ||
    pathname === "/reset-password" ||
    pathname === "/verify-email" ||
    pathname === "/verify-otp"
  ) {
    return null;
  }

  return (
    <footer id='footer' className='bg-[#315D62] text-white'>
      <div className='container mx-auto px-4 py-12 lg:py-16 max-w-7xl'>
        <div className='grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12'>
          {/* Brand Section */}
          <div
            className={`lg:col-span-2 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Logo */}
            <Link href='/' className='flex items-center space-x-3 mb-6'>
              <div className='flex h-10 w-10 items-center justify-center rounded-lg'>
                <svg
                  width='32'
                  height='32'
                  viewBox='0 0 32 32'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M14.0798 7.75001C15.2221 6.91007 16.7778 6.91007 17.9201 7.75001L24.808 12.8147C25.6387 13.4255 26.1292 14.395 26.1292 15.4261V25.758H19.6465V17.066L15.9999 14.3847L12.3534 17.066V25.758H5.87061V15.4261C5.87061 14.395 6.36114 13.4255 7.19182 12.8147L14.0798 7.75001Z'
                    fill='#6ECEDA'
                  />
                  <rect
                    x='12.395'
                    y='25.7578'
                    width='7.24329'
                    height='5.24219'
                    fill='#4A4A4A'
                  />
                </svg>
              </div>
              <span className='text-2xl font-semibold text-white'>
                VeluxaClean
              </span>
            </Link>

            {/* Description */}
            <p className='text-[#FFFFFF] leading-relaxed mb-8 text-lg font-semibold'>
              VeluxaClean is your premier destination for top-notch smart home
              service and repair.
            </p>

            {/* Social Media Icons */}
            <div className='flex space-x-4'>
              {socialLinks.map((social) => (
                <button
                  key={social.name}
                  onClick={() => handleSocialClick(social.href, social.name)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-teal-500 cursor-pointer hover:scale-110 ${social.color}`}
                  aria-label={`Visit our ${social.name} page`}
                >
                  {/* <social.icon className='w-5 h-5' /> */}
                  {React.cloneElement(social.icon, {
                    className: "w-8 h-8",
                  })}
                </button>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h3 className='text-xl font-bold text-white mb-6'>Company</h3>
            <ul className='space-y-4'>
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className='text-teal-100 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block'
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h3 className='text-xl font-bold text-white mb-6'>Support</h3>
            <ul className='space-y-4'>
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className='text-teal-100 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block'
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div
            className={`transition-all duration-1000 delay-600 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h3 className='text-xl font-bold text-white mb-6'>Contact Us</h3>
            <div className='space-y-4'>
              {contactInfo.map((contact, index) => (
                <button
                  key={index}
                  onClick={() => handleContactClick(contact.href)}
                  className='flex items-center space-x-3 text-teal-100 hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-1 group'
                >
                  <div className='w-7 h- rounded-lg flex items-center justify-center transition-colors duration-300'>
                    {/* <contact.icon className='w-4 h-4' /> */}
                    {React.cloneElement(contact.icon, {
                      className: "w-7 h-7",
                    })}
                  </div>
                  <span className='text-base'>{contact.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div
        className={`border-t border-teal-600 mt-12 py-8 transition-all duration-1000 delay-800 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className='text-[#FFFFFF] text-center text-sm'>
          © Copyright by VeluxaClean All rights 2025 reserved.
        </p>
      </div>
    </footer>
  );
}
