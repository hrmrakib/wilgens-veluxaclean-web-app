import AboutSection from "@/components/home/AboutSection";
import BlogCarousel from "@/components/home/BlogCarousel";
import Hero from "@/components/home/Hero";
import ServicesSection from "@/components/home/ServiceSection";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <BlogCarousel />
    </div>
  );
};

export default HomePage;
