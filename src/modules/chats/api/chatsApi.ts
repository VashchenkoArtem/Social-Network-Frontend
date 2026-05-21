import { baseApi } from "@shared/api/baseApi";
import { IChatWithUsers } from "./api.types";

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
            invalidatesTags: ["GroupChats"]
        })
    })
})

export const {
    useGetGroupChatsQuery,
    useGetPersonalChatsQuery,
    useCreateGroupChatMutation
} = chatApi