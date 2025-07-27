import baseAPI from "@/redux/api/baseAPI";

const reviewAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getReviews: build.query({
      query: () => ({
        url: "/review/get-all-review",
        method: "GET",
      }),
    }),

    getReviewsById: build.query({
      query: (id) => ({
        url: `/review/get-review/${id}`,
        method: "GET",
      }),
    }),

    createReview: build.mutation({
      query: (data) => ({
        url: "/review/create-review",
        method: "POST",
        body: data,
      }),
    }),

    deleteReview: build.mutation({
      query: (id) => ({
        url: `/review/delete-review/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useGetReviewsByIdQuery,
  useCreateReviewMutation,
  useDeleteReviewMutation,
} = reviewAPI;

export default reviewAPI;
