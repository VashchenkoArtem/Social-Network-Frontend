import { baseApi } from "@shared/api/baseApi";
import { CreatePostData, PostsPayload, PostsResponse } from "./api.types";
import { CreateAlbumDto } from "@modules/settings/api/albumApi";
import { IPost } from "../ui/postCard/types";

export const postApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllPosts: builder.query<PostsResponse, PostsPayload>({
            query: ({ cursor, limit = 3 }) => {
                const params = new URLSearchParams({
                    limit: String(limit),
                });

                if (cursor) {
                    params.set("cursor", String(cursor));
                }

                return {
                    url: `posts?${params.toString()}`,
                };
            },

            serializeQueryArgs: () => {
                return "posts";
            },

            merge: (currentCache, newItems) => {
                const existingIds = new Set(
                    currentCache.data.map(post => post.id)
                );

                const uniquePosts = newItems.data.filter(
                    post => !existingIds.has(post.id)
                );

                currentCache.data.push(...uniquePosts);
                currentCache.meta = newItems.meta;
            },

            forceRefetch({ currentArg, previousArg }) {
                return currentArg?.cursor !== previousArg?.cursor;
            },
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
    }),
    overrideExisting: true
})

export const {
    useGetAllPostsQuery,
    useMyPostsQuery, 
    useCreatePostMutation,
    useDeletePostMutation,
    useUpdatePostMutation
} = postApi