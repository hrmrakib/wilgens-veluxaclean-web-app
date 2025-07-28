import AboutSection from "@/components/home/AboutSection";
import BlogCarousel from "@/components/home/BlogCarousel";
import ContactSection from "@/components/home/ContactSection";
import FAQSection from "@/components/home/FAQSection";
import Hero from "@/components/home/Hero";
import ServicesSection from "@/components/home/ServiceSection";
import TestimonialsSection from "@/components/home/TestimonialSection";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <BlogCarousel />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
