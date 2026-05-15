import { baseApi } from "@shared/api/baseApi";
import { FriendRequest, CreateFriendRequest, UserWithoutPassword } from './api.types'

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

        createFriendRequest: builder.mutation<CreateFriendRequest, number>({
            query: (body) => {
                return {
                    url: 'requests',
                    method: 'POST',
                    body
                }
            }
        }),

        getUserById: builder.query<UserWithoutPassword, number>({
                    query: (id) => ({
                        url: `user/${id}`,
                        method: 'GET'
                    })
                }),
        })}
)

export const {
    useGetAllFriendsQuery,
    useGetAllRequestsQuery,
    useGetUserByIdQuery
} = friendApi
