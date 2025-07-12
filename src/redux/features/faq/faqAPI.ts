import baseAPI from "@/redux/api/baseAPI";

const faqAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getFaq: builder.query({
      query: () => ({
        url: "/faq/get-all-faq",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetFaqQuery } = faqAPI;
