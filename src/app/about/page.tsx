// import AboutBlogSection from "@/components/about/AboutBlogSection";
import AboutPageSection from "@/components/about/AboutPageSection";
import MissionSection from "@/components/about/MissionSection";
import ValuesSection from "@/components/about/ValuesSection";
import CommonBanner from "@/components/common/CommonBanner";
import React from "react";

const AboutPage = () => {
  return (
    <div>
      <CommonBanner title='About' path='/about' />
      <AboutPageSection />
      <MissionSection />
      <ValuesSection />
      {/* <AboutBlogSection /> */}
    </div>
  );
};

export default AboutPage;
