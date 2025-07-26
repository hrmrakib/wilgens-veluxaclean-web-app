import baseAPI from "@/redux/api/baseAPI";

const chatAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllChats: builder.query({
      query: () => ({
        url: "/chat/get-all-chats",
        method: "GET",
      }),
    }),

    createRoom: builder.mutation({
      query: (data) => ({
        url: "/question-and-ans/create-chat",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllChatsQuery, useCreateRoomMutation } = chatAPI;

export default chatAPI;
