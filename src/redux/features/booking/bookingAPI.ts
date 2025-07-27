import baseAPI from "@/redux/api/baseAPI";

const bookingAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query({
      query: () => ({
        url: "/booking/get-all-booking",
        method: "GET",
      }),
    }),

    createBooking: builder.mutation({
      query: (data) => ({
        url: "/booking/create-booking",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetBookingsQuery, useCreateBookingMutation } = bookingAPI;
