import { baseApi } from "@shared/api/baseApi";
import { IChat } from "./api.types";

export interface ICreateGroupChatDto {
    name: string;
    userIds: number[];
}

export const chatApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getGroupChats: builder.query<IChat[], void>({
            query: () => ({
                url: 'group-chats',
                method: 'GET'
            }),
            providesTags: ["GroupChats"]
        }),

        getPersonalChats: builder.query<IChat[], void>({
            query: () => ({
                url: 'personal-chats',
                method: 'GET'
            })
        }),

        createChat: builder.mutation<IChat, ICreateGroupChatDto>({
            query: (body) => ({
                url: 'chats',
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
    }),
    overrideExisting: true
})

export const {
    useGetGroupChatsQuery,
    useGetPersonalChatsQuery,
    useCreateChatMutation,
    useDeleteGroupChatMutation,
    useGetChatByIdQuery
} = chatApi