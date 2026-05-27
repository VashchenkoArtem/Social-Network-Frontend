import { baseApi } from "@shared/api/baseApi";
import { CreatePostData } from "./api.types";
import { CreateAlbumDto } from "@modules/settings/api/albumApi";
import { IPost } from "../ui/postCard/types";

export const postApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllPosts: builder.query<IPost[], void>({
            query: () => ({
                url: 'posts?take=5',
                method: 'GET'
            }),
        }),
        myPosts: builder.query<IPost[], void>({
            query: () => ({
                url: 'posts/my',
                method: 'GET'
            }),
            providesTags: ['Post']
        }),
        
        createPost: builder.mutation<IPost, FormData>({
            query: (body) => {
                return {
                url: 'posts',
                method: 'POST',
                body
            }},
            invalidatesTags: ['Post']
        }),

        deletePost: builder.mutation<IPost, number>({
            query: (postId) => ({
                url: `posts/${postId}`,
                method: 'DELETE'
            })
        }),

        updatePost: builder.mutation<IPost, { id: number; formData: FormData }>({
            query: ({ id, formData }) => ({
                url: `posts/${id}`,
                method: 'PATCH',
                body: formData,
            }),
            invalidatesTags: ['Post']
        }),
    })
})

export const {
    useGetAllPostsQuery,
    useMyPostsQuery, 
    useCreatePostMutation,
    useDeletePostMutation,
    useUpdatePostMutation
} = postApi