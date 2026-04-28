import { baseApi } from "@shared/api/baseApi";
import { CreatePost, Post } from "./api.types";

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
        
        createPost: builder.mutation<Post, CreatePost>({
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