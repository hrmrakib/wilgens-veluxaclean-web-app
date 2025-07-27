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

    createChat: builder.mutation({
      query: (data) => ({
        url: "/question-and-ans/create-chat",
        method: "POST",
        body: data,
      }),
    }),

    getChatById: builder.query({
      query: (id) => ({
        url: `/chat/get-chat-by-id/${id}`,
        method: "GET",
      }),
    }),

    deleteChat: builder.mutation({
      query: (id) => ({
        url: `/chat/delete-chat/${id}`,
        method: "DELETE",
      }),
    }),

    updateChat: builder.mutation({
      query: ({ id, data }) => ({
        url: `/chat/update-chat/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    updateChatStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/chat/update-chat-status/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllChatsQuery,
  useCreateRoomMutation,
  useCreateChatMutation,
} = chatAPI;

export default chatAPI;
