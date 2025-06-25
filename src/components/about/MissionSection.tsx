import Image from "next/image";

export default function MissionSection() {
  return (
    <section className='py-12 md:py-20 lg:py-24 bg-gray-50'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center'>
          {/* Image Section */}
          <div className='order-2 lg:order-1'>
            <div className='relative rounded-2xl overflow-hidden shadow-xl'>
              <Image
                src='/about/mission.png'
                alt='Professional cleaning team working on windows'
                width={600}
                height={400}
                className='w-full h-auto object-cover'
                priority
              />
            </div>
          </div>

          {/* Content Section */}
          <div className='order-1 lg:order-2 space-y-6'>
            <div className='space-y-4'>
              <p className='text-sm font-medium text-gray-600 uppercase tracking-wider'>
                Our Mission
              </p>
              <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight'>
                Our mission is to simplify your everyday life.
              </h2>
            </div>

            <p className='text-lg text-gray-600 leading-relaxed max-w-xl'>
              Lorem ipsum dolor sit amet consectetur. Tempor bibendum donec
              egestas morbi luctus id. A pharetra est dui non sagittis nulla hac
              viverra aenean.
            </p>

            {/* Optional CTA Button */}
            <div className='pt-4'>
              <button className='inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
                Learn More About Us
                <svg
                  className='ml-2 w-4 h-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 5l7 7-7 7'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
