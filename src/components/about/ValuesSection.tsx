"use client";

import { useState } from "react";
import {
  Shield,
  Heart,
  Scale,
  Target,
  Award,
  Users,
  BookOpen,
  Handshake,
} from "lucide-react";
import Image from "next/image";

const values = [
  {
    id: 1,
    title: "Integrity",
    description:
      "Acting with strong ethics is a priority for everyone representing the organization as well as the company's behaviour as a whole.",
    icon: Shield,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  {
    id: 2,
    title: "Honesty",
    description:
      "It's not just the best policy, it's a core business practice to act in a transparent, trustworthy manner that earns the respect of colleagues, customers and the public.",
    icon: Heart,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  {
    id: 3,
    title: "Fairness",
    description:
      "Treating everyone with the common decency we all deserve and expect.",
    icon: Scale,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    id: 4,
    title: "Accountability",
    description:
      "Accepting responsibility for your actions (and inactions) is the ultimate way to build trust internally and externally.",
    icon: Target,
    color: "text-red-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  {
    id: 5,
    title: "Commitment To Deliver",
    description:
      "Creating a great customer experience begins with staying true to the words we speak and the bonds we make.",
    icon: Award,
    color: "text-green-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  {
    id: 6,
    title: "Diversity & Inclusion",
    description:
      "Organisations succeed by bringing different lived experiences and a range of backgrounds into a shared environment where everyone has equal opportunity.",
    icon: Users,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  {
    id: 7,
    title: "Learning",
    description:
      "No one has all the answers. A culture of humility and continuous learning is a bedrock principle of successful companies.",
    icon: BookOpen,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  {
    id: 8,
    title: "Teamwork",
    description:
      "When people work together, they can create something greater than themselves as individuals.",
    icon: Handshake,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
];

export default function ValuesSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className='py-12 md:py-20 lg:py-24 bg-white'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-12 md:mb-16'>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight max-w-4xl mx-auto'>
            The Value That Driven What We Do
          </h2>
        </div>

        {/* Values Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto'>
          {values.map((value) => {
            const IconComponent = value.icon;
            const isHovered = hoveredCard === value.id;

            return (
              <div
                key={value.id}
                className={` bg-white 
                  relative p-6 lg:p-8 rounded-2xl border-2 transition-all duration-300 cursor-pointer
                  ${
                    isHovered
                      ? `${value.bgColor} ${value.borderColor} shadow-lg transform -translate-y-1`
                      : "bg-gray-50 border-gray-200 hover:border-gray-300"
                  }
                `}
                style={{ boxShadow: "4px 0px 12px 0px #E48E3352" }}
                onMouseEnter={() => setHoveredCard(value.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Content Container */}
                <div className='flex items-start justify-between'>
                  {/* Text Content */}
                  <div className='flex-1 pr-4'>
                    <h3 className='text-xl lg:text-[28px] font-bold text-[#4A4A4A] mb-3'>
                      {value.title}
                    </h3>
                    <p className='text-[#4A4A4A] leading-relaxed text-base lg:text-lg'>
                      {value.description}
                    </p>
                  </div>

                  {/* Icon */}
                  <div>
                    <Image
                      src={value.icon}
                      alt={value.title}
                      width={50}
                      height={50}
                    />
                  </div>

                  {/* <div
                    className={`
                    flex-shrink-0 w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center transition-all duration-300
                    ${isHovered ? value.bgColor : "bg-white"}
                  `}
                  >
                    <IconComponent
                      className={`w-6 h-6 lg:w-7 lg:h-7 transition-colors duration-300 ${
                        isHovered ? value.color : "text-gray-400"
                      }`}
                    />
                  </div> */}
                </div>

                {/* Hover Effect Overlay */}
                <div
                  className={`
                  absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none
                  ${isHovered ? "opacity-5" : "opacity-0"}
                  ${value.bgColor}
                `}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
