// "use client";

// import * as React from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";

// const services = [
//   { name: "Maintenances", href: "/services/maintenance" },
//   { name: "Repairs", href: "/services/repairs" },
//   { name: "Improvements", href: "/services/improvements" },
// ];

// export default function Hero() {
//   const [isVisible, setIsVisible] = React.useState(false);

//   React.useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   return (
//     <section className='relative min-h-screen bg-[#F4F6FB] overflow-hidden'>
//       <div className='container mx-auto px-4 py-12 lg:py-20'>
//         <div className='grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]'>
//           {/* Left Content */}
//           <div
//             className={`col-span-1 space-y-8 transition-all duration-1000 ${
//               isVisible
//                 ? "opacity-100 translate-x-0"
//                 : "opacity-0 -translate-x-10"
//             }`}
//           >
//             {/* Services Navigation */}
//             <nav className='flex flex-wrap gap-4 text-sm'>
//               {services.map((service, index) => (
//                 <React.Fragment key={service.name}>
//                   <Link
//                     href={service.href}
//                     className='text-[#B0B2B9] hover:text-[#B0B2B9] text-xl font-bold transition-colors duration-200'
//                   >
//                     {service.name}
//                   </Link>
//                   {index < services.length - 1 && (
//                     <span className='text-[#B0B2B9]'>•</span>
//                   )}
//                 </React.Fragment>
//               ))}
//             </nav>

//             {/* Main Heading */}
//             <div className='space-y-4'>
//               <h1 className='relative text-4xl md:text-5xl lg:text-[56px] font-bold text-[#4A4A4A] leading-tight'>
//                 Happiness Is Freshly{" "}
//                 <span className='text-[#15B2F5] relative'>
//                   Cleaning
//                   <div className='absolute -bottom-2 left-0 w-full h-1 bg-white/30 rounded-full' />
//                 </span>{" "}
//                 House
//                 <div className='absolute bottom-5 -left-5'>
//                   <svg
//                     width='30'
//                     height='43'
//                     viewBox='0 0 30 43'
//                     fill='none'
//                     xmlns='http://www.w3.org/2000/svg'
//                   >
//                     <path
//                       d='M29.3022 12.4119L20.5524 15.813L17.4387 24.6691L14.0376 15.9193L5.18151 12.8055L13.9313 9.40447L17.0451 0.548343L20.4461 9.29817L29.3022 12.4119Z'
//                       fill='#F3C54C'
//                     />
//                     <path
//                       d='M8.98072 34.0497L6.33026 35.8496L5.97131 39.0332L4.17144 36.3828L0.987784 36.0238L3.63824 34.2239L3.99719 31.0403L5.79706 33.6907L8.98072 34.0497Z'
//                       fill='#4977E5'
//                     />
//                     <path
//                       d='M16.7768 40.1045L15.5287 40.9521L15.3596 42.4513L14.512 41.2032L13.0127 41.0341L14.2609 40.1865L14.43 38.6872L15.2776 39.9354L16.7768 40.1045Z'
//                       fill='#F3C54C'
//                     />
//                   </svg>
//                 </div>
//               </h1>

//               <p className='text-[#838B95] text-sm md:text-base max-w-[540px] leading-loose'>
//                 Awesome site on the top advertising a Courses available business
//                 online includes assembling having awesome site on the top
//                 advertising a Courses available business having.
//               </p>
//             </div>

//             {/* CTA Buttons */}
//             <div className='flex flex-col sm:flex-row gap-4'>
//               <Button
//                 variant='outline'
//                 size='lg'
//                 className='w-[150px] h-[52px] bg-transparent hover:bg-[#6ECEDA] hover:text-[#4A4A4A] border-[#2f452b23] text-[#15B2F5]  rounded-full transition-all duration-300'
//                 asChild
//               >
//                 <Link href='/about'>About Us</Link>
//               </Button>

//               <Button
//                 size='lg'
//                 className='w-[150px] h-[52px] bg-[#6ECEDA] text-[#4A4A4A] rounded-full hover:bg-transparent transition-all duration-300 shadow-lg'
//                 asChild
//               >
//                 <Link href='/contact' className='flex items-center gap-2'>
//                   <span className='text-[#4A4A4A]'> Call Us Now</span>
//                   <div>
//                     <svg
//                       width='34'
//                       height='34'
//                       viewBox='0 0 34 34'
//                       fill='none'
//                       xmlns='http://www.w3.org/2000/svg'
//                     >
//                       <rect width='34' height='34' rx='17' fill='white' />
//                       <path
//                         d='M22.8328 19.8704V21.6204C22.8335 21.7828 22.8002 21.9436 22.7351 22.0925C22.6701 22.2414 22.5746 22.375 22.4549 22.4848C22.3352 22.5946 22.1938 22.6782 22.04 22.7303C21.8861 22.7823 21.723 22.8017 21.5612 22.787C19.7662 22.592 18.0419 21.9786 16.527 20.9962C15.1176 20.1006 13.9226 18.9056 13.027 17.4962C12.0412 15.9744 11.4277 14.2418 11.2362 12.4387C11.2216 12.2774 11.2408 12.1148 11.2925 11.9613C11.3442 11.8078 11.4273 11.6668 11.5365 11.5472C11.6457 11.4275 11.7786 11.332 11.9267 11.2665C12.0749 11.2011 12.235 11.1672 12.397 11.167H14.147C14.4301 11.1643 14.7046 11.2645 14.9192 11.4491C15.1339 11.6337 15.2741 11.8901 15.3137 12.1704C15.3875 12.7304 15.5245 13.2803 15.722 13.8095C15.8005 14.0183 15.8175 14.2452 15.771 14.4634C15.7244 14.6815 15.6164 14.8818 15.4595 15.0404L14.7187 15.7812C15.5491 17.2416 16.7583 18.4508 18.2187 19.2812L18.9595 18.5404C19.1181 18.3835 19.3184 18.2755 19.5365 18.2289C19.7546 18.1824 19.9816 18.1994 20.1903 18.2779C20.7196 18.4754 21.2695 18.6124 21.8295 18.6862C22.1129 18.7262 22.3717 18.8689 22.5567 19.0873C22.7417 19.3056 22.8399 19.5843 22.8328 19.8704Z'
//                         fill='#15B2F5'
//                       />
//                     </svg>
//                   </div>
//                 </Link>
//               </Button>
//             </div>
//           </div>

//           {/* Right Content - Image with Floating Elements */}
//           <div className='relative'>
//             <Image
//               src='/home/hero.png'
//               alt='Professional cleaner in blue uniform with cleaning supplies'
//               className='w-[512px] h-[812px]'
//               width={480}
//               height={480}
//             />
//           </div>

//           {/* <div
//             className={`relative transition-all duration-1000 delay-300 ${
//               isVisible
//                 ? "opacity-100 translate-x-0"
//                 : "opacity-0 translate-x-10"
//             }`}
//           >
//             <div className='relative w-full max-w-md mx-auto'>
//               <div className='aspect-[3/4] bg-gradient-to-br from-white/20 to-white/10 rounded-3xl backdrop-blur-sm border border-white/20 flex items-center justify-center'>
//                 <div className='text-center text-white/80'>
//                   <div className='w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center'></div>
//                   <p className='text-sm'>Professional Cleaner</p>
//                 </div>
//               </div>
//             </div>
//           </div> */}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const services = [
  { name: "Maintenances", href: "/services/maintenance" },
  { name: "Repairs", href: "/services/repairs" },
  { name: "Improvements", href: "/services/improvements" },
];

export default function Hero() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className='relative bg-[#F4F6FB] overflow-hidden'>
      {/* Right side full-screen background */}
      <div className='hidden lg:block absolute bottom-0 -top-32 right-0 w-1/2 min-h-full bg-[url("/home/hero.png")] bg-no-repeat bg-cover z-0' />

      {/* Main content inside container */}
      <div className='relative container mx-auto flex flex-col lg:flex-row lg:min-h-screen z-10'>
        {/* Left Content */}

        <div
          className={`w-full lg:w-1/2 px-4 py-12 lg:py-40 space-y-8 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-10"
          }`}
        >
          {/* Services Navigation */}
          <nav className='flex flex-wrap gap-2 md:gap-4 text-sm'>
            {services.map((service, index) => (
              <React.Fragment key={service.name}>
                <Link
                  href={service.href}
                  className='text-[#B0B2B9] hover:text-[#B0B2B9] text-sm md:text-xl font-bold transition-colors duration-200'
                >
                  {service.name}
                </Link>
                {index < services.length - 1 && (
                  <span className='text-[#B0B2B9]'>•</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Main Heading */}
          <div className='space-y-4'>
            <h1 className='relative text-[32px] md:text-5xl lg:text-[56px] font-bold text-[#4A4A4A] leading-tight px-2'>
              Happiness Is Freshly{" "}
              <span className='text-[#15B2F5] relative'>
                Cleaning
                <div className='absolute -bottom-2 left-0 w-full h-1 bg-white/30 rounded-full' />
              </span>{" "}
              House
              <div className='absolute bottom-5 -left-5'>
                <svg
                  width='30'
                  height='43'
                  viewBox='0 0 30 43'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M29.3022 12.4119L20.5524 15.813L17.4387 24.6691L14.0376 15.9193L5.18151 12.8055L13.9313 9.40447L17.0451 0.548343L20.4461 9.29817L29.3022 12.4119Z'
                    fill='#F3C54C'
                  />
                  <path
                    d='M8.98072 34.0497L6.33026 35.8496L5.97131 39.0332L4.17144 36.3828L0.987784 36.0238L3.63824 34.2239L3.99719 31.0403L5.79706 33.6907L8.98072 34.0497Z'
                    fill='#4977E5'
                  />
                  <path
                    d='M16.7768 40.1045L15.5287 40.9521L15.3596 42.4513L14.512 41.2032L13.0127 41.0341L14.2609 40.1865L14.43 38.6872L15.2776 39.9354L16.7768 40.1045Z'
                    fill='#F3C54C'
                  />
                </svg>
              </div>
            </h1>

            <p className='text-[#838B95] text-sm md:text-base max-w-[540px] leading-loose'>
              Awesome site on the top advertising a Courses available business
              online includes assembling having awesome site on the top
              advertising a Courses available business having.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className='flex items-center gap-4'>
            <Button
              variant='outline'
              size='lg'
              className='w-[150px] h-[52px] bg-transparent hover:bg-[#6ECEDA] hover:text-[#4A4A4A] border-[#2f452b23] text-[#15B2F5]  rounded-full transition-all duration-300'
              asChild
            >
              <Link href='/about'>About Us</Link>
            </Button>

            <Button
              size='lg'
              className='w-[150px] h-[52px] bg-[#6ECEDA] text-[#4A4A4A] rounded-full hover:bg-transparent transition-all duration-300 shadow-lg'
              asChild
            >
              <Link href='/contact' className='flex items-center gap-2'>
                <span className='text-[#4A4A4A]'> Call Us Now</span>
                <div>
                  <svg
                    width='34'
                    height='34'
                    viewBox='0 0 34 34'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <rect width='34' height='34' rx='17' fill='white' />
                    <path
                      d='M22.8328 19.8704V21.6204C22.8335 21.7828 22.8002 21.9436 22.7351 22.0925C22.6701 22.2414 22.5746 22.375 22.4549 22.4848C22.3352 22.5946 22.1938 22.6782 22.04 22.7303C21.8861 22.7823 21.723 22.8017 21.5612 22.787C19.7662 22.592 18.0419 21.9786 16.527 20.9962C15.1176 20.1006 13.9226 18.9056 13.027 17.4962C12.0412 15.9744 11.4277 14.2418 11.2362 12.4387C11.2216 12.2774 11.2408 12.1148 11.2925 11.9613C11.3442 11.8078 11.4273 11.6668 11.5365 11.5472C11.6457 11.4275 11.7786 11.332 11.9267 11.2665C12.0749 11.2011 12.235 11.1672 12.397 11.167H14.147C14.4301 11.1643 14.7046 11.2645 14.9192 11.4491C15.1339 11.6337 15.2741 11.8901 15.3137 12.1704C15.3875 12.7304 15.5245 13.2803 15.722 13.8095C15.8005 14.0183 15.8175 14.2452 15.771 14.4634C15.7244 14.6815 15.6164 14.8818 15.4595 15.0404L14.7187 15.7812C15.5491 17.2416 16.7583 18.4508 18.2187 19.2812L18.9595 18.5404C19.1181 18.3835 19.3184 18.2755 19.5365 18.2289C19.7546 18.1824 19.9816 18.1994 20.1903 18.2779C20.7196 18.4754 21.2695 18.6124 21.8295 18.6862C22.1129 18.7262 22.3717 18.8689 22.5567 19.0873C22.7417 19.3056 22.8399 19.5843 22.8328 19.8704Z'
                      fill='#15B2F5'
                    />
                  </svg>
                </div>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
