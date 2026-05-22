import { baseApi } from "@shared/api/baseApi";
import { IChat, IChatWithUsers } from "./api.types";

export const chatApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getGroupChats: builder.query<IChatWithUsers[], void>({
            query: () => ({
                url: 'group-chats',
                method: 'GET'
            })
        }),

        getPersonalChats: builder.query<IChatWithUsers[], void>({
            query: () => ({
                url: 'personal-chats',
                method: 'GET'
            })
        }),

        deleteGroupChat: builder.mutation<IChat, number>({
            query: (chatId) => ({
                url: `group-chats/${chatId}`,
                method: 'DELETE'
            })
        }),
        getChatById: builder.query<IChat, number>({
            query: (chatId) => ({
                url: `chat/${chatId}`
            })
        })
    })
})

export const {
    useGetGroupChatsQuery,
    useGetPersonalChatsQuery,
    useDeleteGroupChatMutation,
    useGetChatByIdQuery
} = chatApi