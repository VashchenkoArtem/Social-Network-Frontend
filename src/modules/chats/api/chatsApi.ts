import { baseApi } from "@shared/api/baseApi";
import { IChat, IChatWithUsers } from "./api.types";

export interface ICreateGroupChatDto {
    name: string;
    userIds: number[];
}

export const chatApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getGroupChats: builder.query<IChatWithUsers[], void>({
            query: () => ({
                url: 'group-chats',
                method: 'GET'
            }),
            providesTags: ["GroupChats"]
        }),

        getPersonalChats: builder.query<IChatWithUsers[], void>({
            query: () => ({
                url: 'personal-chats',
                method: 'GET'
            })
        }),

        createGroupChat: builder.mutation<IChatWithUsers, ICreateGroupChatDto>({
            query: (body) => ({
                url: 'group-chats',
                method: 'POST',
                body
            }),
            invalidatesTags: ["GroupChats"]}),
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
    useCreateGroupChatMutation,
    useDeleteGroupChatMutation,
    useGetChatByIdQuery
} = chatApi