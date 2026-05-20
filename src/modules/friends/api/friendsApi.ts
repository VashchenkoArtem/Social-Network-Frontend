import { baseApi } from "@shared/api/baseApi";
import { FriendRequest, CreateFriendRequest, UpdateFriendRequest, Profile, UserWithoutPassword } from './api.types'
import { Post } from "@modules/posts/api/api.types";

export const friendApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllFriends: builder.query<FriendRequest[], void>({
            query: () => ({
                url: 'friends',
                method: 'GET'
            })
        }),

        getAllRequests: builder.query<FriendRequest[], void>({
            query: () => ({
                url: 'requests',
                method: 'GET'
            })
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

        getRecommendedPeople: builder.query<Profile[], void>({
            query: () => ({
                url: 'recommended',
                method: 'GET'
            })
        }),
        getUserById: builder.query<Profile, number>({
                    query: (id) => ({
                        url: `users/${id}`,
                        method: 'GET'
                    })
                }),
        getPostsByUserId: builder.query<Post[], number>({
            query: (userId) => ({
                url: `users/${userId}/posts`,
                method: "GET"
            })
        })
            }),
})

export const {
    useGetAllFriendsQuery,
    useGetAllRequestsQuery,
    useDeleteFriendRequestMutation,
    useCreateFriendRequestMutation,
    useUpdateFriendRequestMutation,
    useGetRecommendedPeopleQuery,
    useGetUserByIdQuery,
    useGetPostsByUserIdQuery
} = friendApi
