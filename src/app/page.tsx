import AboutSection from "@/components/home/AboutSection";
import Hero from "@/components/home/Hero";
import ServicesSection from "@/components/home/serviceSection";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <AboutSection />
      <ServicesSection />
    </div>
  );
};

export default HomePage;
