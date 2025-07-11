import baseAPI from "@/redux/api/baseAPI";

const BlogAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: () => ({
        url: "/blog/all-blogs",
        method: "GET",
      }),
    }),

    getBlogById: builder.query({
      query: (id) => ({
        url: `/blog/get-details/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllBlogsQuery, useGetBlogByIdQuery } = BlogAPI;
