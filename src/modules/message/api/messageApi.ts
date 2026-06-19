import { baseApi } from "@shared/api/baseApi";
import { IMessageQuery, IUnreadMessageFromChatResponse } from "./api.types";
import { IMessage, MessagePayload, PaginatedMessageResponse } from "@shared/types/message.types";
import { socket } from "@shared/socket/socket";

export const messageApi = baseApi.injectEndpoints({
    endpoints: ( builder ) => ({
        getMessages: builder.query<PaginatedMessageResponse, MessagePayload>({
            query: ({chatId, cursor, limit = 25}) => {
                const params = new URLSearchParams({
                    limit: String(limit)
                })

                if (cursor) {
                    params.set("cursor", String(cursor))
                }

                return {
                    url: `messages/chats/${chatId}?${params.toString()}`
                }
            },

            async onCacheEntryAdded(
				{ chatId },
				{ updateCachedData, cacheDataLoaded, cacheEntryRemoved },
			) {
				await cacheDataLoaded;
				const listener = (newMessage: IMessage) => {
					if (newMessage.chat_id === chatId) {
						updateCachedData((draft) => {
							draft.messages.unshift(newMessage);
						})
					}
				}

				socket.on("newMessage", listener) 
                await cacheEntryRemoved
                socket.off("newMessage", listener)
			}, 

            // async onCacheEntryAdded(
                // arg,
                // { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
                // ) {
                // await cacheDataLoaded;

                // const listener = (message: IMessage) => {
                //     updateCachedData((draft) => {
                //     const exists = draft.some(m => m.id === message.id);
                //     if (!exists) {
                //         draft.unshift(message);
                //     }
                //     });
                // };

                // socket.on("newMessage", listener);
                // await cacheEntryRemoved;
                // socket.off("newMessage", listener);
            // },
            
            serializeQueryArgs: ({ queryArgs }) => {
                return queryArgs.chatId.toString()
            },
            
            merge: (currentCache, newItems) => {
                const existingIds = new Set(
                    currentCache.messages.map((message) => message.id)
                )
                const uniqueMessages = newItems.messages.filter (
                    (message) => !existingIds.has(message.id)
                )
                if (uniqueMessages.length > 0) {
					currentCache.messages.push(...uniqueMessages)
				}
                currentCache.meta = newItems.meta
            },

            forceRefetch({ currentArg, previousArg }) {
                return (
                    currentArg?.chatId !== previousArg?.chatId ||
                    currentArg?.cursor !== previousArg?.cursor
                )
            },            
        }),
        getAllUnreadMessage: builder.query<number, void>({
            query: () => ({
                url: "messages/unread",
            })
        }),
        getUnreadMessageFromChat: builder.query<IUnreadMessageFromChatResponse, void>({
            query: () => ({
                url: "/messages/unreadChat"
            })
        }),
        markMessagesAsRead: builder.query<void, number>({
            query: (chatId) => ({
                url: `/messages/read/chat/${chatId}`
            })
        }),
    }),
    overrideExisting: true
})

export const { 
    useGetMessagesQuery,
    useGetAllUnreadMessageQuery,
    useGetUnreadMessageFromChatQuery,
    useLazyMarkMessagesAsReadQuery
} = messageApi