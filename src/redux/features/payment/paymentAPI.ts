import baseAPI from "@/redux/api/baseAPI";

const paymentAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    createPayment: builder.mutation({
      query: (data) => ({
        url: "/payment/create-checkout-session",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreatePaymentMutation } = paymentAPI;
export default paymentAPI;
