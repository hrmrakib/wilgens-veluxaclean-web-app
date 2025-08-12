"use client";

import { useGetTermsAndConditionsQuery } from "@/redux/features/setting/settingAPI";

export default function PrivacyPolicy() {
  const { data } = useGetTermsAndConditionsQuery({});

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8'>
        <div className='bg-white rounded-lg p-8 lg:p-12'>
          <header className='mb-12'>
            <h1 className='text-4xl font-bold text-gray-900 mb-4'>
              📄 Terms and Conditions
            </h1>
            <p className='text-lg text-gray-600'>
              Last updated:{" "}
              {data?.data[0]?.updatedAt
                ? new Date(data?.data[0]?.updatedAt).toLocaleDateString()
                : ""}
            </p>
          </header>

          <div className='prose prose-lg max-w-none'>
            <p
              className='text-gray-700 leading-relaxed'
              // dangerouslySetInnerHTML={{
              //   __html: DOMPurify.sanitize(data?.data[0]?.description || ""),
              // }}
              dangerouslySetInnerHTML={data?.data[0]?.description}
            ></p>
          </div>
        </div>
      </div>
    </div>
  );
}
