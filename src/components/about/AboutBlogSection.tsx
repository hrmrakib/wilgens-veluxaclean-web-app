"use client";

import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import { useState } from "react";

const blogPosts = [
  {
    id: 1,
    title: "Residential Cleaning Service",
    date: "17 June 2025",
    description:
      "Discover the ultimate guide to troubleshooting common smart home issues in our latest blog post. From connectivity problems to device malfunctions...",
    category: "Residential",
    categoryColor: "bg-blue-100 text-blue-700",
    image: "/about/blog1.png",
    slug: "residential-cleaning-service",
  },
  {
    id: 2,
    title: "Move-in/Move-out",
    date: "18 June 2025",
    description:
      "Discover the ultimate guide to troubleshooting common smart home issues in our latest blog post. From connectivity problems to device malfunctions...",
    category: "Move-in/Move-out",
    categoryColor: "bg-teal-100 text-teal-700",
    image: "/about/blog2.png",
    slug: "move-in-move-out",
  },
  {
    id: 3,
    title: "Carpet Cleaning Service",
    date: "19 June 2025",
    description:
      "Discover the ultimate guide to troubleshooting common smart home issues in our latest blog post. From connectivity problems to device malfunctions...",
    category: "Carpet",
    categoryColor: "bg-green-100 text-green-700",
    image: "/about/blog3.png",
    slug: "carpet-cleaning-service",
  },
  {
    id: 4,
    title: "Commercial Cleaning Service",
    date: "19 June 2025",
    description:
      "Discover the ultimate guide to troubleshooting common smart home issues in our latest blog post. From connectivity problems to device malfunctions...",
    category: "Commercial",
    categoryColor: "bg-purple-100 text-purple-700",
    image: "/about/blog4.png",
    slug: "commercial-cleaning-service",
  },
];

export default function AboutBlogSection() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleCardClick = (slug: string) => {
    // Navigate to blog post - you can implement routing here
    console.log(`Navigate to: /blog/${slug}`);
  };

  return (
    <section className='py-12 md:py-20 lg:py-24 bg-gray-50'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-12 md:mb-16'>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4'>
            Explore Insights in Our Blog
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed'>
            Find lots of insights and information on our blog. Explore, learn,
            and get inspired today.
          </p>
        </div>

        {/* Blog Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto'>
          {blogPosts.map((post) => {
            const isHovered = hoveredCard === post.id;

            return (
              <article
                key={post.id}
                className={`
                  bg-transparent overflow-hidden rounded-3xl
                  transition-all duration-300 cursor-pointer group
                  ${
                    isHovered
                      ? "shadow-xl transform -translate-y-2"
                      : "hover:shadow-lg"
                  }
                `}
                // onMouseEnter={() => setHoveredCard(post.id)}
                // onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleCardClick(post.slug)}
              >
                {/* Image Container */}
                <div className='relative h-48 sm:h-72 overflow-hidden'>
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={600}
                    height={400}
                    className={`
                      object-cover transition-transform duration-500
                      ${isHovered ? "scale-110" : "scale-100"}
                    `}
                  />
                  {/* <div className='absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300' /> */}
                </div>

                {/* Content */}
                <div className='p-6'>
                  {/* Date */}
                  <div className='flex items-center text-sm text-gray-500 mb-3'>
                    <Calendar className='w-4 h-4 mr-2' />
                    {post.date}
                  </div>

                  {/* Title */}
                  <h3 className='text-xl lg:text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200'>
                    {post.title}
                  </h3>

                  {/* Description */}
                  <p className='text-gray-600 leading-relaxed mb-4 line-clamp-3'>
                    {post.description}
                  </p>

                  {/* Read More Link */}
                  <div className='flex items-center justify-between text-blue-600 font-medium group-hover:text-blue-700 transition-colors duration-200'>
                    <div className='flex items-center'>
                      <span className='text-sm'>Read More</span>
                      <ArrowRight
                        className={`
                      w-4 h-4 ml-2 transition-transform duration-200
                      ${isHovered ? "translate-x-1" : "translate-x-0"}
                    `}
                      />
                    </div>

                    {/* Category Badge */}
                    <div className=''>
                      <span
                        className={`
                      px-3 py-1 rounded-full text-xs font-medium
                      ${post.categoryColor}
                    `}
                      >
                        {post.category}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* View All Button */}
        <div className='text-center mt-12'>
          <button className='inline-flex items-center px-8 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'>
            View All Blog Posts
            <ArrowRight className='ml-2 w-4 h-4' />
          </button>
        </div>
      </div>
    </section>
  );
}
