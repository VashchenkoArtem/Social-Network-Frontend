import { baseApi } from "@shared/api/baseApi";
import { FriendRequest, CreateFriendRequest, UpdateFriendRequest } from './api.types'
import { IUser } from "@shared/types/user.types";
import { IPost } from "@modules/posts/ui/postCard/types";
import { FriendsProps } from "../ui/friendFrame/types";

export const friendApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllFriends: builder.query<FriendsProps[], void>({
            query: () => ({
                url: 'friends',
                method: 'GET'
            })
        }),

        getAllRequests: builder.query<FriendsProps[], void>({
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

        getRecommendedPeople: builder.query<IUser[], void>({
            query: () => ({
                url: 'recommended',
                method: 'GET'
            })
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
