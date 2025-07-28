import baseAPI from "@/redux/api/baseAPI";

const settingAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getTermsAndConditions: builder.query({
      query: () => ({
        url: `/setting/get/terms-and-conditions`,
        method: "GET",
      }),
    }),

    setTermsAndConditions: builder.mutation({
      query: (data) => ({
        url: `/setting/update/terms-and-conditions`,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    getPrivacyPolicy: builder.query({
      query: () => ({
        url: `/setting/get/privacy-policy`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        method: "GET",
      }),
    }),

    setPrivacyPolicy: builder.mutation({
      query: (data) => ({
        url: `/setting/update/privacy-policy`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: data,
      }),
    }),

    getTrustAndSafety: builder.query({
      query: () => ({
        url: `/setting/get/trust-and-safety`,
        method: "GET",
      }),
    }),

    setTrustAndSafety: builder.mutation({
      query: (data) => ({
        url: `/setting/update/trust-and-safety`,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),
  }),
});

export const {
  useGetTermsAndConditionsQuery,
  useSetTermsAndConditionsMutation,
  useGetPrivacyPolicyQuery,
  useSetPrivacyPolicyMutation,
  useGetTrustAndSafetyQuery,
  useSetTrustAndSafetyMutation,
} = settingAPI;
