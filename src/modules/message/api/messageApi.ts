import { baseApi } from "@shared/api/baseApi";
import { IMessageQuery } from "./api.types";
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
        getAllUnreadMessage: builder.query<IMessage[], void>({
            query: () => ({
                url: "messages/unread",
            })
        }),
        getUnreadMessageFromChat: builder.query<IMessage[], number>({
            query: (chatid) => ({
                url: "/messages/unreadChat",
                method: "POST",
                body: [{chatid}]
            })
        })
    }),
    overrideExisting: true
})

export const { 
    useGetMessagesQuery,
    useGetAllUnreadMessageQuery,
    useGetUnreadMessageFromChatQuery
} = messageApi