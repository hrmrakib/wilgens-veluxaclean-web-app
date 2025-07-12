import baseAPI from "@/redux/api/baseAPI";

const cleaningContactAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCleaningContact: builder.query({
      query: () => ({
        url: "/cleaning-contact/get-all-cleaning-contact",
        method: "GET",
      }),
    }),

    createCleaningContact: builder.mutation({
      query: (data) => ({
        url: "/contact/create-cleaning-contact",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetCleaningContactQuery, useCreateCleaningContactMutation } =
  cleaningContactAPI;
