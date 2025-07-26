"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useGetAllBlogsQuery } from "@/redux/features/blog/blogAPI";

interface IBlog {
  _id: string;
  title: string;
  description: string;
  image: string[];
  createdAt: string;
  updatedAt: string;
}

export default function BlogPageSesction() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: blogs } = useGetAllBlogsQuery({});

  console.log("data", blogs?.data?.result);

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
          {blogs?.data?.result?.map((post: IBlog) => (
            <Link href={`/blog/${post._id}`} key={post._id}>
              <Card
                key={post._id}
                className='!bg-transparent overflow-hidden border-0  hover:shadow-md transition-shadow duration-200'
              >
                <div className='aspect-[3/2] relative overflow-hidden'>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${post?.image[0]}`}
                    alt={post.title}
                    fill
                    className='object-cover transition-transform duration-300'
                    sizes='(max-width: 768px) 100vw, 50vw'
                  />
                </div>
                <CardContent className='px-6 pb-6'>
                  <div className='space-y-3'>
                    <p className='text-base text-[#545971] font-medium'>
                      {post?.createdAt?.split("T")[0]}
                    </p>
                    <h2 className='text-xl md:text-[32px] font-bold text-[#171921] leading-tight'>
                      {post?.title}
                    </h2>
                    <p className='text-[#545971] leading-relaxed text-lg'>
                      {post?.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* No Results Message */}
        {blogs?.data?.result.length === 0 && searchQuery && (
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
        {searchQuery && blogs?.data?.result.length > 0 && (
          <div className='mt-8 text-center text-sm text-gray-500'>
            {`Showing ${blogs?.data?.result?.length} result${
              blogs?.data?.result?.length !== 1 ? "s" : ""
            } for "${searchQuery}"`}
          </div>
        )}
      </div>
    </div>
  );
}
