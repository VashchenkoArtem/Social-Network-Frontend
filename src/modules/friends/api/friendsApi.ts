import { baseApi } from "@shared/api/baseApi";
import { FriendRequest, CreateFriendRequest } from './api.types'

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

        deleteFriendRequest: builder.mutation<void, number>({
            query: (id) => {
                return {
                    url: `requests/${id}`,
                    method: 'DELETE'
                }
            }
        })
})}
)

export const {
    useGetAllFriendsQuery,
    useGetAllRequestsQuery,
    useDeleteFriendRequestMutation
} = friendApi
