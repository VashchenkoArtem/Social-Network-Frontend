import { baseApi } from "@shared/api/baseApi";
import { IMessageQuery, IUnreadMessageFromChatResponse } from "./api.types";
import { IMessage, IUnreadCountUpdatePayload, IUnreadSummary, MessagePayload, PaginatedMessageResponse } from "@shared/types/message.types";
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

                // Нове повідомлення — додаємо в початок списку
				const newMessageListener = (newMessage: IMessage) => {
					if (newMessage.chat_id === chatId) {
						updateCachedData((draft) => {
							draft.messages.unshift(newMessage);
						})
					}
				}

                // Співрозмовник зайшов у чат — позначаємо всі наші повідомлення прочитаними
                const messagesReadListener = (data: { chatId: number; readerId: number }) => {
                    if (data.chatId !== chatId) return
                    updateCachedData((draft) => {
                        draft.messages.forEach((message) => {
                            const alreadyRead = message.chat_app_message_readers?.some(
                                (r) => r.user_id === data.readerId
                            )
                            if (!alreadyRead) {
                                if (!message.chat_app_message_readers) {
                                    message.chat_app_message_readers = []
                                }
                                message.chat_app_message_readers.push({ user_id: data.readerId })
                            }
                        })
                    })
                }

				socket.on("newMessage", newMessageListener)
                socket.on("messagesRead", messagesReadListener)

                await cacheEntryRemoved
                socket.off("newMessage", newMessageListener)
                socket.off("messagesRead", messagesReadListener)
			}, 

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

        // Кількість непрочитаних окремо для особистих (is_group=false) або групових (is_group=true) чатів.
        getAllUnreadMessage: builder.query<number, { isGroup?: boolean } | void>({
            query: (arg) => {
                const params = new URLSearchParams()
                if (arg?.isGroup !== undefined) {
                    params.set("is_group", String(arg.isGroup))
                }
                const query = params.toString()
                return {
                    url: `messages/unread${query ? `?${query}` : ""}`,
                }
            },
            async onCacheEntryAdded(
                arg,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
            ) {
                await cacheDataLoaded;
                const listener = (payload: IUnreadCountUpdatePayload) => {
                    updateCachedData(() => {
                        if (arg?.isGroup === true) return payload.summary.group
                        if (arg?.isGroup === false) return payload.summary.personal
                        return payload.summary.personal
                    })
                }
                socket.on("unreadCountUpdate", listener)
                await cacheEntryRemoved
                socket.off("unreadCountUpdate", listener)
            },
        }),

        // Загальна кількість непрочитаних: особисті + групові чати разом.
        getUnreadSummary: builder.query<IUnreadSummary, void>({
            query: () => ({
                url: "messages/unread/summary",
            }),
            async onCacheEntryAdded(
                _arg,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
            ) {
                await cacheDataLoaded;
                const listener = (payload: IUnreadCountUpdatePayload) => {
                    updateCachedData(() => payload.summary)
                }
                socket.on("unreadCountUpdate", listener)
                await cacheEntryRemoved
                socket.off("unreadCountUpdate", listener)
            },
        }),

        // Мапа chatId -> кількість непрочитаних повідомлень у цьому чаті.
        getUnreadMessageFromChat: builder.query<IUnreadMessageFromChatResponse, void>({
            query: () => ({
                url: "/messages/unreadChat"
            }),
            async onCacheEntryAdded(
                _arg,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
            ) {
                await cacheDataLoaded;
                const listener = (payload: IUnreadCountUpdatePayload) => {
                    updateCachedData(() => payload.byChat)
                }
                socket.on("unreadCountUpdate", listener)
                await cacheEntryRemoved
                socket.off("unreadCountUpdate", listener)
            },
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
    useGetUnreadSummaryQuery,
    useGetUnreadMessageFromChatQuery,
    useLazyMarkMessagesAsReadQuery
} = messageApi