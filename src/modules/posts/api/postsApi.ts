import { baseApi } from "@shared/api/baseApi";
import { CreatePostData, Post } from "./api.types";
import { CreateAlbumDto } from "@modules/settings/api/albumApi";

export const postApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllPosts: builder.query<Post[], void>({
            query: () => ({
                url: 'posts?take=5',
                method: 'GET'
            }),
        }),

        myPosts: builder.query<Post[], void>({
            query: () => ({
                url: 'posts/my',
                method: 'GET'
            }),
            providesTags: ['Post']
        }),
        
        createPost: builder.mutation<Post, FormData>({
            query: (body) => ({
                url: 'posts',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Post']
        })
    })
})

export const {
    useGetAllPostsQuery,
    useMyPostsQuery, 
    useCreatePostMutation
} = postApi