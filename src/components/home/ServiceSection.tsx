"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Home, TentTree, AlarmSmoke, TreePalm } from "lucide-react";

const services = [
  {
    id: 1,
    icon: Home,
    title: "Residential Cleaning Service",
    description: "Drain pipe leaking, pipe clogged, replace the pipe line",
    href: "/services/residential",
    color: "bg-cyan-100",
    iconColor: "text-cyan-600",
  },
  {
    id: 2,
    icon: TentTree,
    title: "Move-in/Move-out",
    description: "Roof leaks, tile replacement, roof cleaning and maintenance",
    href: "/services/move-in-out",
    color: "bg-cyan-100",
    iconColor: "text-cyan-600",
  },
  {
    id: 3,
    icon: AlarmSmoke,
    title: "Carpet Cleaning Service",
    description: "Removing and cleaning mildew, Restoration and Prevention",
    href: "/services/carpet-cleaning",
    color: "bg-cyan-100",
    iconColor: "text-cyan-600",
  },
  {
    id: 4,
    icon: TreePalm,
    title: "Commercial Cleaning Service",
    description:
      "repair of washing machines, refrigerators, Air conditioner, etc",
    href: "/services/commercial",
    color: "bg-cyan-100",
    iconColor: "text-cyan-600",
  },
];

export default function ServicesSection() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [hoveredCard, setHoveredCard] = React.useState<number | null>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("services-section");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const handleServiceClick = (serviceId: number, href: string) => {
    console.log(`Navigating to service ${serviceId}: ${href}`);
    // In a real app, this would handle navigation
  };

  const handleContactClick = () => {
    console.log("Contact Now clicked");
    // In a real app, this would open a contact modal or navigate to contact page
  };

  return (
    <section
      id='services-section'
      className='py-16 lg:py-24 bg-gray-50 px-6 md:px-0'
      style={{
        background:
          "radial-gradient(61.56% 61.56% at 50% 50%, rgba(21, 178, 245, 0.0936) 0%, rgba(110, 206, 218, 0.0468) 100%)",
      }}
    >
      <div className='container mx-auto'>
        {/* Header */}
        <div
          className={`max-w-[570px] mx-auto text-center mb-16 transition-all duration-1000 
            ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }
          `}
        >
          <h2 className='text-4xl md:text-5xl lg:text-[52px] font-bold text-[#171921] mb-6'>
            Our Services
          </h2>
          <p className='text-base md:text-lg text-[#545971] leading-relaxed'>
            You have problems with leaking pipes, broken tiles, lost keys or
            want to tidy up the trees around you, of course you need our help!
          </p>
        </div>

        {/* Services Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {/* Service Cards */}
          {services.map((service, index) => (
            <Card
              key={service.id}
              className={`group cursor-pointer transition-all duration-700 hover:shadow-none shadow-xl hover:-translate-y-2 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              } ${index === 3 ? "md:col-span-1 lg:col-span-1" : ""}`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleServiceClick(service.id, service.href)}
            >
              <CardContent className='p-8 h-full flex flex-col'>
                <div className='flex flex-col items-start space-y-6'>
                  {/* Icon */}
                  <div
                    className={`!bg-[#52cada] w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      hoveredCard === service.id ? "scale-110" : service.color
                    }`}
                  >
                    <service.icon
                      className={`w-8 h-8 text-white transition-colors duration-300 ${
                        hoveredCard === service.id
                          ? "text-white"
                          : service.iconColor
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <div className='space-y-4 flex-grow'>
                    <h3 className='text-xl md:text-2xl font-bold text-[#171921] leading-tight group-hover:text-cyan-600 transition-colors duration-300'>
                      {service.title}
                    </h3>
                    <p className='text-[#545971] text-lg leading-relaxed'>
                      {service.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Call-to-Action Card */}
          <Card
            className={`group cursor-pointer transition-all duration-700 hover:shadow-xl hover:-translate-y-2 bg-[#15B2F5] border-0 md:col-span-1 lg:col-span-1 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: `${services.length * 150}ms` }}
            onClick={handleContactClick}
          >
            <CardContent className='p-8 h-full flex flex-col justify-center items-center text-center text-[#fff]'>
              <div className='space-y-6'>
                <h3 className='text-2xl md:text-3xl font-bold'>
                  More service?
                </h3>
                <p className='text-lg leading-relaxed opacity-90'>
                  You can tell us what you need and we can help!
                </p>
                <button
                  className='w-[356px] mx-auto h-16 flex items-center justify-center text-base md:text-2xl bg-white text-cyan-600 hover:bg-gray-50 font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleContactClick();
                  }}
                >
                  Contact Now
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
