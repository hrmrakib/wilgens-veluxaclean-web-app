"use client";

import type React from "react";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface BlogPost {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Window Cleaning",
    date: "17 June 2025",
    description:
      "Discover the ultimate guide to troubleshooting common smart home issues in our latest blog post. From connectivity problems to device malfunctions.",
    image: "/blog1.png",
    category: "cleaning",
  },
  {
    id: 2,
    title: "Bedroom Cleaning",
    date: "18 June 2025",
    description:
      "Discover the ultimate guide to troubleshooting common smart home issues in our latest blog post. From connectivity problems to device malfunctions.",
    image: "/blog2.png",
    category: "cleaning",
  },
  {
    id: 3,
    title: "Office Cleaning Service",
    date: "19 June 2025",
    description:
      "Discover the ultimate guide to troubleshooting common smart home issues in our latest blog post. From connectivity problems to device malfunctions.",
    image: "/blog3.png",
    category: "cleaning",
  },
  {
    id: 4,
    title: "Bathroom Cleaning",
    date: "16 June 2025",
    description:
      "Discover the ultimate guide to troubleshooting common smart home issues in our latest blog post. From connectivity problems to device malfunctions.",
    image: "/blog4.png",
    category: "cleaning",
  },
  {
    id: 5,
    title: "Window Cleaning",
    date: "17 June 2025",
    description:
      "Discover the ultimate guide to troubleshooting common smart home issues in our latest blog post. From connectivity problems to device malfunctions.",
    image: "/blog3.png",
    category: "cleaning",
  },
  {
    id: 6,
    title: "Bedroom Cleaning",
    date: "18 June 2025",
    description:
      "Discover the ultimate guide to troubleshooting common smart home issues in our latest blog post. From connectivity problems to device malfunctions.",
    image: "/blog4.png",
    category: "cleaning",
  },
];

export default function BlogPageSesction() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) {
      return blogPosts;
    }

    return blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by the useMemo hook above
  };

  return (
    <div
      className='min-h-screen py-16'
      style={{
        background:
          "radial-gradient(61.56% 61.56% at 50% 50%, rgba(21, 178, 245, 0.0936) 0%, rgba(110, 206, 218, 0.0468) 100%)",
      }}
    >
      <div className='container mx-auto px-4 py-8 max-w-6xl'>
        {/* Search Bar */}
        <div className='flex justify-end mb-8 md:mb-16'>
          <form onSubmit={handleSearch} className='relative w-full max-w-md'>
            <Input
              type='text'
              placeholder='Search here...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='pr-12 !py-8 bg-white border-gray-200 focus:border-gray-300 focus:ring-gray-300 !placeholder:text-gray-700'
            />
            <Button
              type='submit'
              size='sm'
              variant='ghost'
              className='absolute right-2.5 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100'
            >
              <Search className='h-4 w-4 text-gray-500' />
              <span className='sr-only'>Search</span>
            </Button>
          </form>
        </div>

        {/* Blog Posts Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8'>
          {filteredPosts.map((post) => (
            <Link href={`/blog/${post.id}`} key={post.id}>
              <Card
                key={post.id}
                className='!bg-transparent overflow-hidden border-0  hover:shadow-md transition-shadow duration-200'
              >
                <div className='aspect-[3/2] relative overflow-hidden'>
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className='object-cover transition-transform duration-300'
                    sizes='(max-width: 768px) 100vw, 50vw'
                  />
                </div>
                <CardContent className='px-6 pb-6'>
                  <div className='space-y-3'>
                    <p className='text-base text-[#545971] font-medium'>
                      {post.date}
                    </p>
                    <h2 className='text-xl md:text-[32px] font-bold text-[#171921] leading-tight'>
                      {post.title}
                    </h2>
                    <p className='text-[#545971] leading-relaxed text-lg'>
                      {post.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* No Results Message */}
        {filteredPosts.length === 0 && searchQuery && (
          <div className='text-center py-12'>
            <div className='text-gray-500 text-lg mb-2'>No results found</div>
            <p className='text-gray-400'>
              {"Try adjusting your search terms or browse all posts"}
            </p>
            <Button
              onClick={() => setSearchQuery("")}
              variant='outline'
              className='mt-4'
            >
              Clear Search
            </Button>
          </div>
        )}

        {/* Results Count */}
        {searchQuery && filteredPosts.length > 0 && (
          <div className='mt-8 text-center text-sm text-gray-500'>
            {`Showing ${filteredPosts.length} result${
              filteredPosts.length !== 1 ? "s" : ""
            } for "${searchQuery}"`}
          </div>
        )}
      </div>
    </div>
  );
}
