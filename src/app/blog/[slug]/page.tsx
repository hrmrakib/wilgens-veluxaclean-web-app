"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import CommonBanner from "@/components/common/CommonBanner";

interface Comment {
  id: number;
  author: string;
  avatar?: string;
  content: string;
  date: string;
}

interface ReviewForm {
  name: string;
  email: string;
  phone: string;
  comment: string;
}

export default function BlogDetailPage() {
  const [comments] = useState<Comment[]>([
    {
      id: 1,
      author: "Taylor Smith",
      content:
        "This article was very informative! I learned so much about residential cleaning services. The tips provided were practical and easy to implement.",
      date: "2 days ago",
    },
    {
      id: 2,
      author: "Andrea Nora",
      content:
        "Great insights on professional cleaning services. I've been considering hiring a cleaning service and this article helped me understand what to look for.",
      date: "1 week ago",
    },
  ]);

  const [reviewForm, setReviewForm] = useState<ReviewForm>({
    name: "",
    email: "",
    phone: "",
    comment: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setReviewForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Review submitted:", reviewForm);
    // Here you would typically send the data to your backend
    alert("Thank you for your review!");
    setReviewForm({ name: "", email: "", phone: "", comment: "" });
  };

  return (
    <div className='min-h-screen bg-white'>
      <CommonBanner title='Blog Detail' path='/blog' />

      {/* Main Content */}
      <article className='container mx-auto px-4 max-w-4xl pb-16 pt-12'>
        {/* Hero Image */}
        <div className='aspect-[16/9] md:aspect-[2/1] relative overflow-hidden rounded-2xl mb-8'>
          <Image
            src='/blog-detail1.png'
            alt='Professional cleaners working on windows'
            fill
            className='object-cover'
            priority
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px'
          />
        </div>

        {/* Title and Introduction */}
        <header className='mb-8'>
          <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6'>
            Residential Cleaning Service
          </h1>
          <p className='text-gray-700 leading-relaxed text-lg mb-6'>
            The rush to give employees access to all the tools they&apos;d need
            to work from home was a bit, well, sudden for many employers. But
            after everyone settled in, what quickly became apparent to many
            office-based teams is that employees could be productive and focused
            when not in the office—in many cases, even more so. Employers
            everywhere began to understand that remote work really works.
          </p>
          <p className='text-gray-700 leading-relaxed'>
            Whether you&apos;re on the hunt for a remote job or are already
            working virtually, check out this list of the advantages of working
            from home, along with some of the top companies that hire for remote
            jobs.
          </p>
        </header>

        {/* Two Column Images */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
          <div className='aspect-[4/3] relative overflow-hidden rounded-xl'>
            <Image
              src='/blog1.png'
              alt='Cleaning supplies and tools'
              fill
              className='object-cover'
              sizes='(max-width: 768px) 100vw, 50vw'
            />
          </div>
          <div className='aspect-[4/3] relative overflow-hidden rounded-xl'>
            <Image
              src='/blog2.png'
              alt='Professional cleaning in progress'
              fill
              className='object-cover'
              sizes='(max-width: 768px) 100vw, 50vw'
            />
          </div>
        </div>

        {/* Replica Quests Section */}
        <section className='mb-8'>
          <h2 className='text-2xl font-bold text-gray-900 mb-4'>
            Replica Quests
          </h2>
          <p className='text-gray-700 leading-relaxed mb-4'>
            Professional cleaning services have become increasingly important as
            more people work from home. Here are some key considerations when
            choosing a residential cleaning service that fits your needs and
            schedule.
          </p>
          <ul className='space-y-2 text-gray-700'>
            <li className='flex items-start'>
              <span className='text-blue-500 mr-2'>•</span>
              <span>
                Flexible scheduling to accommodate your work-from-home routine
              </span>
            </li>
            <li className='flex items-start'>
              <span className='text-blue-500 mr-2'>•</span>
              <span>
                Eco-friendly cleaning products that are safe for your family and
                pets
              </span>
            </li>
            <li className='flex items-start'>
              <span className='text-blue-500 mr-2'>•</span>
              <span>
                Comprehensive services including deep cleaning and maintenance
              </span>
            </li>
          </ul>
        </section>

        {/* Takeaways Section */}
        <section className='mb-8'>
          <h2 className='text-2xl font-bold text-gray-900 mb-4'>Takeaways</h2>
          <div className='space-y-3'>
            <div className='flex items-start'>
              <span className='bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5'>
                1
              </span>
              <p className='text-gray-700'>
                Professional cleaning services can significantly improve your
                home office environment and productivity.
              </p>
            </div>
            <div className='flex items-start'>
              <span className='bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5'>
                2
              </span>
              <p className='text-gray-700'>
                Regular cleaning schedules help maintain a healthy and organized
                workspace.
              </p>
            </div>
            <div className='flex items-start'>
              <span className='bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5'>
                3
              </span>
              <p className='text-gray-700'>
                Choosing the right cleaning service involves considering factors
                like reliability, eco-friendliness, and flexibility.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom Image */}
        <div className='aspect-[16/9] relative overflow-hidden rounded-xl mb-8'>
          <Image
            src='/blog-detail2.png'
            alt='Floor cleaning with mop and supplies'
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px'
          />
        </div>

        {/* Final Content */}
        <div className='mb-12'>
          <p className='text-gray-700 leading-relaxed mb-4'>
            As more professionals choose to work from home, the demand for
            residential cleaning services has grown significantly. A clean,
            organized home environment can boost productivity, reduce stress,
            and create a more professional atmosphere for video calls and
            meetings.
          </p>
          <p className='text-gray-700 leading-relaxed'>
            When selecting a cleaning service, consider factors such as
            scheduling flexibility, cleaning products used, insurance coverage,
            and customer reviews. The right cleaning service can become an
            invaluable partner in maintaining your work-life balance and
            creating an optimal home office environment.
          </p>
        </div>

        {/* Comments Section */}
        <section className='mb-12'>
          <h2 className='text-2xl font-bold text-gray-900 mb-6'>
            {comments.length} Comments
          </h2>
          <div className='space-y-6'>
            {comments.map((comment) => (
              <Card key={comment.id} className='border-0 shadow-sm'>
                <CardContent className='p-6'>
                  <div className='flex items-start space-x-4'>
                    <Avatar className='w-12 h-12'>
                      <AvatarImage
                        src={comment.avatar || "/placeholder.svg"}
                        alt={comment.author}
                      />
                      <AvatarFallback className='bg-blue-100 text-blue-600'>
                        {comment.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex-1'>
                      <div className='flex items-center space-x-2 mb-2'>
                        <h3 className='font-semibold text-gray-900'>
                          {comment.author}
                        </h3>
                        <span className='text-sm text-gray-500'>
                          {comment.date}
                        </span>
                      </div>
                      <p className='text-gray-700 leading-relaxed'>
                        {comment.content}
                      </p>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='mt-2 text-blue-600 hover:text-blue-700 p-0'
                      >
                        Reply
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Review Form */}
        <section>
          <h2 className='text-2xl font-bold text-gray-900 mb-6'>
            Edit Your Review
          </h2>
          <Card className='border-0 shadow-sm'>
            <CardContent className='p-6'>
              <form onSubmit={handleSubmitReview} className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label
                      htmlFor='name'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      Name
                    </label>
                    <Input
                      id='name'
                      name='name'
                      type='text'
                      value={reviewForm.name}
                      onChange={handleInputChange}
                      placeholder='Your full name'
                      required
                      className='w-full'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      Email
                    </label>
                    <Input
                      id='email'
                      name='email'
                      type='email'
                      value={reviewForm.email}
                      onChange={handleInputChange}
                      placeholder='your.email@example.com'
                      required
                      className='w-full'
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor='phone'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Phone
                  </label>
                  <Input
                    id='phone'
                    name='phone'
                    type='tel'
                    value={reviewForm.phone}
                    onChange={handleInputChange}
                    placeholder='Your phone number'
                    className='w-full'
                  />
                </div>
                <div>
                  <label
                    htmlFor='comment'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Comment
                  </label>
                  <Textarea
                    id='comment'
                    name='comment'
                    value={reviewForm.comment}
                    onChange={handleInputChange}
                    placeholder='Share your thoughts about this article...'
                    rows={4}
                    required
                    className='w-full resize-none'
                  />
                </div>
                <Button
                  type='submit'
                  className='bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-2'
                >
                  Add Review
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </article>
    </div>
  );
}
