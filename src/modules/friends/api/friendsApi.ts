import { baseApi } from "@shared/api/baseApi";
import { CreateFriendRequest, UpdateFriendRequest, PaginatedUsersResponse, PaginatedFriendsProps } from './api.types'
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

        getAllRequests: builder.query<PaginatedFriendsProps, { cursor?: number; limit?: number }>({
            query: ({ cursor, limit = 3 }) => {
                const params = new URLSearchParams({
                    limit: String(limit)
                })

                if (cursor) {
                    params.set("cursor", String(cursor))
                }

                return {
                    url: `requests?${params.toString()}`
                }
            },

            serializeQueryArgs: ({ queryArgs }) => {
                return `requests-${queryArgs.cursor}-${queryArgs.limit}`;
            },
            
            merge: (currentCache, newItems) => {
                const existingIds = new Set(
                    currentCache.data.map(user => user.id)
                )

                const uniqueUsers = newItems.data.filter(
                    user => !existingIds.has(user.id)
                )
                currentCache.data.push(...uniqueUsers)
                currentCache.meta = newItems.meta
            },

            forceRefetch({ currentArg, previousArg }) {
                return currentArg?.cursor !== previousArg?.cursor
            },

            providesTags: (result) =>
                result
                    ? [
                        ...result.data.map(({ id }) => ({
                            type: 'RequestedUsers' as const,
                            id,
                        })),
                        { type: 'RequestedUsers', id: 'LIST' },
                    ]
                    : [{ type: 'RequestedUsers', id: 'LIST' }],
            
            // query: () => ({
            //     url: 'requests',
            //     method: 'GET'
            // }),
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

        getRecommendedPeople: builder.query<PaginatedUsersResponse, { cursor?: number; limit?: number }>({
            query: ({ cursor, limit = 3 }) => {
                const params = new URLSearchParams({
                    limit: String(limit)
                })

                if (cursor) {
                    params.set("cursor", String(cursor))
                }

                return {
                    url: `recommended?${params.toString()}`
                }
            },

            serializeQueryArgs: ({ queryArgs }) => {
                return `recommended-${queryArgs.cursor}-${queryArgs.limit}`;
            },
            
            merge: (currentCache, newItems) => {
                const existingIds = new Set(
                    currentCache.data.map(user => user.id)
                )

                const uniqueUsers = newItems.data.filter(
                    user => !existingIds.has(user.id)
                )
                currentCache.data.push(...uniqueUsers)
                currentCache.meta = newItems.meta
            },

            forceRefetch({ currentArg, previousArg }) {
                return currentArg?.cursor !== previousArg?.cursor
            },

            providesTags: (result) =>
                result
                    ? [
                        ...result.data.map(({ id }) => ({
                            type: 'RecommendedUsers' as const,
                            id,
                        })),
                        { type: 'RecommendedUsers', id: 'LIST' },
                    ]
                    : [{ type: 'RecommendedUsers', id: 'LIST' }],
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
