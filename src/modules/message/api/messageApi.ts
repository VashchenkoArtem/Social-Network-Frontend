import { baseApi } from "@shared/api/baseApi";
import { IMessageQuery, IUnreadMessageFromChatResponse } from "./api.types";
import { IMessage, IMessageResponse } from "@shared/types/message.types";
import { socket } from "@shared/socket/socket";

export const messageApi = baseApi.injectEndpoints({
    endpoints: ( builder ) => ({
        getMessages: builder.query<IMessage[], IMessageQuery>({
            query: ({ chatId, cursorId, take }) => ({
                url: `messages/chats/${chatId}`,
                params: {
                    take,
                    cursorId: cursorId ? cursorId : undefined
                }
            }),
            
            async onCacheEntryAdded(
                arg,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
            ) {
                await cacheDataLoaded;

                const listener = (message: IMessage) => {
                    if (message.chat_id !== arg.chatId) return;

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

            merge(currentCache, newItems, { arg }) {
                if (!arg.cursorId) {
                    return newItems;
                }
                
                const existingIds = new Set(currentCache.map(item => item.id));
                const uniqueNewItems = newItems.filter(item => !existingIds.has(item.id));
                
                currentCache.push(...uniqueNewItems);
            },

            forceRefetch({ currentArg, previousArg }) {
                return (
                    currentArg?.chatId !== previousArg?.chatId ||
                    currentArg?.cursorId !== previousArg?.cursorId
                );
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