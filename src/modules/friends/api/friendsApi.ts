import { baseApi } from "@shared/api/baseApi";
import { FriendRequest, CreateFriendRequest, UpdateFriendRequest, RecommendedResponse, RecommendedPayload } from './api.types'
import { IUser } from "@shared/types/user.types";
import { IPost } from "@modules/posts/ui/postCard/types";
import { FriendsProps } from "../ui/friendFrame/types";

export const friendApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllFriends: builder.query<FriendsProps[], void>({
            query: () => ({
                url: 'friends',
                method: 'GET'
            }),
            keepUnusedDataFor: 60
        }),

        getAllRequests: builder.query<FriendsProps[], void>({
            query: () => ({
                url: 'requests',
                method: 'GET'
            }),
            keepUnusedDataFor: 60
        }),
        
        createFriendRequest: builder.mutation<void, CreateFriendRequest>({
            query: (body) => ({
                url: 'requests',
                method: 'POST',
                body
            })
        }),

        deleteFriendRequest: builder.mutation<void, number>({
            query: (id) => ({
                url: `requests/${id}`,
                method: 'DELETE'
            })
        }),

        updateFriendRequest: builder.mutation<void, UpdateFriendRequest>({
            query: (body) => ({
                url: 'requests',
                method: 'PATCH',
                body
            })
        }),

    getRecommendedPeople: builder.query<
        RecommendedResponse,
        RecommendedPayload
    >({
        query: ({ cursor, limit = 2 }) => ({
            url: `recommended?limit=2${cursor ? `&cursor=${cursor}` : ""}`,
            method: "GET",
        }),

        serializeQueryArgs: ({ endpointName }) => {
            return endpointName;
        },

    merge: (currentCache, newData, { arg }) => {
        if (!arg.cursor) {
            currentCache.data = newData.data;
            currentCache.meta = newData.meta;
            return;
        }

        currentCache.data.push(...newData.data);
        currentCache.meta = newData.meta;
    },

        forceRefetch({ currentArg, previousArg }) {
            return currentArg?.cursor !== previousArg?.cursor;
        },
    }),
        getUserById: builder.query<IUser, number>({
                    query: (id) => ({
                        url: `users/${id}`,
                        method: 'GET'
                    })
                }),
        getPostsByUserId: builder.query<IPost[], number>({
            query: (userId) => ({
                url: `users/${userId}/posts`,
                method: "GET"
            })
        })
            }),
            overrideExisting: true
})

export const {
    useGetAllFriendsQuery,
    useGetAllRequestsQuery,
    useDeleteFriendRequestMutation,
    useCreateFriendRequestMutation,
    useUpdateFriendRequestMutation,
    useGetRecommendedPeopleQuery,
    useGetUserByIdQuery,
    useGetPostsByUserIdQuery,
    useLazyGetAllFriendsQuery,
    useLazyGetAllRequestsQuery,
    useLazyGetRecommendedPeopleQuery
} = friendApi
