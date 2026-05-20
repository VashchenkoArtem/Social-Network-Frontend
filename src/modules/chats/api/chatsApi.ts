import { baseApi } from "@shared/api/baseApi";
import { IChatWithUsers } from "./api.types";

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
    })
})

export const {
    useGetGroupChatsQuery,
    useGetPersonalChatsQuery
} = chatApi