import CommonBanner from "@/components/common/CommonBanner";
import ContactFormSection from "@/components/contact/ContactFormSection";
import React from "react";

const ContactPage = () => {
  return (
    <div>
      <CommonBanner title='Contact' path='/contact' />

      <ContactFormSection />
    </div>
  );
};

export default ContactPage;
