import { baseApi } from "@shared/api/baseApi";
import { IMessageQuery, IUnreadMessageFromChatResponse } from "./api.types";
import { IMessage, IMessageResponse } from "@shared/types/message.types";
import { socket } from "@shared/socket/socket";

export const messageApi = baseApi.injectEndpoints({
    endpoints: ( builder ) => ({
        getMessages: builder.query<IMessage[], IMessageQuery>({
            query: ({chatId, cursorId, take}) => ({
                url: `messages/chats/${chatId}?cursorId=${cursorId}&take=${take}`
            }),
            async onCacheEntryAdded(
            arg,
            { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
            ) {
            await cacheDataLoaded;

            const listener = (message: IMessage) => {
                updateCachedData((draft) => {
                const exists = draft.some(m => m.id === message.id);
                if (!exists) {
                    draft.unshift(message);
                }
                });
            };

            socket.on("newMessage", listener);

            await cacheEntryRemoved;

            socket.off("newMessage", listener);
            },
            merge (
                currentCache, newItems
            ){
                const filteredItems = newItems.filter((item) => {
                    return !currentCache.includes(item)
                })
                currentCache.push(...filteredItems)
            },
            forceRefetch: ({ currentArg, previousArg }) => {
                return currentArg !== previousArg
            }
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