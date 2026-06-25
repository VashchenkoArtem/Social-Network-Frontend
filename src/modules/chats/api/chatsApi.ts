import { baseApi } from "@shared/api/baseApi";
import { IChat, IChatPayload, IPaginatedChatResponse } from "./api.types";
import { socket } from "@shared/socket/socket";
import { IMessage } from "@shared/types/message.types";

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

            providesTags: (result) =>
                result
                    ? [
                        ...result.chats.map(({ id }) => ({ type: 'GroupChats' as const, id })),
                        { type: 'GroupChats', id: 'LIST' },
                    ]
                    : [{ type: 'GroupChats', id: 'LIST' }],

            async onCacheEntryAdded(
                _arg,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
            ) {
                await cacheDataLoaded;
                const listener = (message: IMessage) => {
                    updateCachedData((draft) => {
                        const chat = draft.chats.find((c) => c.id === message.chat_id)
                        if (!chat) return
                        chat.chat_app_message = [{
                            id: message.id,
                            text: message.text,
                            created_at: message.created_at,
                            sender_id: message.sender_id,
                        }]
                        draft.chats = [
                            chat,
                            ...draft.chats.filter((c) => c.id !== message.chat_id),
                        ]
                    })
                }
                socket.on("newMessage", listener)
                await cacheEntryRemoved
                socket.off("newMessage", listener)
            },
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