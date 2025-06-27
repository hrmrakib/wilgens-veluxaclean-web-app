"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

const faqData = [
  {
    id: "item-1",
    question: "What is VeluxaClean?",
    answer:
      "VeluxaClean is a home care platform that connects homeowners with professional service providers offering a wide range of home services, including repairs, maintenance, cleaning, and more.",
  },
  {
    id: "item-2",
    question:
      "Are the service providers on VeluxaClean reliable and qualified?",
    answer:
      "Yes, all service providers on VeluxaClean go through a rigorous vetting process. We verify their credentials, insurance, and background checks. Additionally, we maintain a rating system based on customer reviews to ensure quality service delivery.",
  },
  {
    id: "item-3",
    question: "What if I have an issue or complaint about a service provider?",
    answer:
      "We take customer satisfaction seriously. If you have any issues, you can contact our customer support team through the app or website. We have a dispute resolution process and will work to resolve any problems quickly and fairly.",
  },
  {
    id: "item-4",
    question: "How are payments handled on VeluxaClean?",
    answer:
      "Payments are processed securely through our platform. You can pay using credit cards, debit cards, or digital wallets. Payment is typically held in escrow until the service is completed to your satisfaction, ensuring protection for both parties.",
  },
  {
    id: "item-5",
    question: "How do I leave a review for a service provider?",
    answer:
      "After your service is completed, you'll receive a notification to rate and review your experience. You can also access the review section through your account dashboard. Your feedback helps maintain service quality and assists other customers in making informed decisions.",
  },
];

export default function FAQSection() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [openItem, setOpenItem] = React.useState("item-1");

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("faq-section");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const handleGetHelpAI = () => {
    console.log("Get Help AI clicked");
    // In a real app, this would open an AI chat widget or help system
  };

  return (
    <section id='faq-section' className='py-16 lg:py-24 bg-[#FFFFFF] px-6 md:px-0'>
      <div className='container mx-auto'>
        <div className='grid lg:grid-cols-2 gap-12 lg:gap-16'>
          {/* Left Side - Header */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className='lg:sticky lg:top-8'>
              <h2 className='text-4xl md:text-5xl lg:text-[40px] font-bold text-[#4A4A4A] leading-tight mb-8'>
                Frequently Asked <br /> Questions
              </h2>

              <div className='flex items-center space-x-2 text-lg'>
                <span className='text-[#171921] text-xl'>Still need help?</span>
                <Link
                  href='/help'
                  className='text-[#15B2F5] hover:text-cyan-600 font-semibold p-0 h-auto text-lg'
                  onClick={handleGetHelpAI}
                >
                  Get Help AI
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side - FAQ Accordion */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <Accordion
              type='single'
              collapsible
              value={openItem}
              onValueChange={(val) => setOpenItem(val)}
              className='space-y-4'
            >
              {faqData.map((faq, index) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className={`rounded-lg hover:shadow-md transition-all duration-300 ${
                    openItem === faq.id ? "bg-[#F3F5F9]" : "bg-transparent"
                  } ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${600 + index * 150}ms` }}
                >
                  <AccordionTrigger className='px-6 py-4 text-left hover:no-underline group'>
                    <div className='flex items-start space-x-3 w-full'>
                      {/* <HelpCircle className='w-5 h-5 text-cyan-500 mt-1 flex-shrink-0' /> */}
                      <span className='text-2xl font-semibold text-[#545971] group-hover:text-cyan-600 transition-colors duration-200 text-left'>
                        {faq.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className='px-6 pb-6'>
                    <div className=''>
                      <p className='text-[#737373] leading-relaxed text-base'>
                        {faq.answer}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
