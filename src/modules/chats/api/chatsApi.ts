import { baseApi } from "@shared/api/baseApi";
import { IChat, IChatPayload, IPaginatedChatResponse } from "./api.types";

export interface ICreateGroupChatDto {
    name: string;
    userIds: number[];
}

export const chatApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getGroupChats: builder.query<IPaginatedChatResponse, IChatPayload>({
            query: ({cursor, limit = 25}) => {
                const params = new URLSearchParams({
                    limit: String(limit)
                })

                if (cursor) {
                    params.set("cursor", String(cursor))
                }

                return {
                    url: `group-chats?${params.toString()}`,
                }
            },

            serializeQueryArgs: ({ queryArgs }) => {
                return 'groupChat'
            },
            
            merge: (currentCache, newItems) => {
                const currentChats = currentCache?.chats ?? []
                const incomingChats = newItems?.chats ?? []

                const existingIds = new Set(
                    currentChats.map((chat) => chat.id)
                )

                const uniqueChats = incomingChats.filter(
                    (chat) => !existingIds.has(chat.id)
                )

                if (uniqueChats.length > 0) {
                    currentCache.chats.push(...uniqueChats)
                }

                currentCache.meta = newItems?.meta
            },

            forceRefetch({ currentArg, previousArg }) {
                return (
                    currentArg?.cursor !== previousArg?.cursor
                )
            },

            providesTags: (result) =>
                result
                    ? [
                        ...result.chats.map(({ id }) => ({ type: 'GroupChats' as const, id })),
                        { type: 'GroupChats', id: 'LIST' },
                    ]
                    : [{ type: 'GroupChats', id: 'LIST' }],                
            // ({
            //     url: 'group-chats',
            //     method: 'GET'
            // }),
            // providesTags: ["GroupChats"]
        }),

        getPersonalChats: builder.query<IPaginatedChatResponse, IChatPayload>({
            query: ({cursor, limit = 25}) => {
                const params = new URLSearchParams({
                    limit: String(limit)
                })

                if (cursor) {
                    params.set("cursor", String(cursor))
                }

                return {
                    url: `personal-chats?${params.toString()}`,
                }
            },

            serializeQueryArgs: ({ queryArgs }) => {
                return 'personalChat'
            },
            merge: (currentCache, newItems) => {
                const current = currentCache?.chats ?? []
                const incoming = newItems?.chats ?? []

                const existingIds = new Set(current.map(c => c.id))

                const unique = incoming.filter(c => !existingIds.has(c.id))

                currentCache.chats = [...current, ...unique]
                currentCache.meta = newItems?.meta
            },

            forceRefetch({ currentArg, previousArg }) {
                return (
                    currentArg?.cursor !== previousArg?.cursor
                )
            }
            // ({
            //     url: 'personal-chats',
            //     method: 'GET'
            // })
        }),

        createChat: builder.mutation<IChat, ICreateGroupChatDto>({
            query: (body) => ({
                url: 'chat',
                method: 'POST',
                body
            }),
            invalidatesTags: ["GroupChats"]}),
        deleteGroupChat: builder.mutation<IChat, number>({
            query: (chatId) => ({
                url: `group-chats/${chatId}`,
                method: 'DELETE'
            }),
            async onQueryStarted(chatId, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(
                        chatApi.util.updateQueryData('getGroupChats', { limit: 25 }, (draft) => {
                            if (draft && draft.chats) {
                                draft.chats = draft.chats.filter(chat => chat.id !== chatId);
                            }
                        })
                    );
                } catch (error) {
                    console.error("Не вдалося видалити чат з кешу:", error);
                }
            }
        }),
        getChatById: builder.query<IChat, number>({
            query: (chatId) => ({
                url: `chat/${chatId}`
            })
        }),
        leaveGroupChat: builder.mutation<void, number>({
            query: (chatId) => ({
                url: `group-chats/${chatId}/leave`,
                method: 'DELETE' 
            }),
            async onQueryStarted(chatId, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    
                    dispatch(
                        chatApi.util.updateQueryData('getGroupChats', { limit: 25 }, (draft) => {
                            if (draft && draft.chats) {
                                draft.chats = draft.chats.filter(chat => chat.id !== chatId);
                            }
                        })
                    );
                } catch (error) {
                    console.error("Не вдалося оновити кеш після виходу з чату:", error);
                }
            }
        }),
    }),
    overrideExisting: true
})

export const {
    useGetGroupChatsQuery,
    useGetPersonalChatsQuery,
    useCreateChatMutation,
    useDeleteGroupChatMutation,
    useGetChatByIdQuery,
    useLazyGetChatByIdQuery,
    useLazyGetPersonalChatsQuery,
    useLazyGetGroupChatsQuery,
    useLeaveGroupChatMutation
} = chatApi