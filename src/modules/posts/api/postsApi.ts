import { baseApi } from "@shared/api/baseApi";
import { CreatePostData, PostHeart, PostLike, PostsPayload, PostsResponse } from "./api.types";
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
            providesTags: (result) =>
                result
                    ? [
                        ...result.data.map(({ id }) => ({ type: 'Post' as const, id })),
                        { type: 'Post', id: 'LIST' },
                    ]
                    : [{ type: 'Post', id: 'LIST' }],
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

        viewPost: builder.mutation<{ message: string }, number>({
            query: (postId) => ({
                url: `posts/${postId}/view`,
                method: 'POST',
            }),
            invalidatesTags: (result, error, postId) => [{ type: 'Post', id: postId }]
        }),

        getAllLikes: builder.query<PostLike[], void> ({
            query: () => ({
                url: 'likes',
                method: 'GET'
            }),
            providesTags: ['Likes']
        }),

        createLike: builder.mutation<PostLike, { postId: number }>({
            query: ({ postId }) => ({
                url: `posts/${postId}/like`,
                method: 'POST'
            }),
            invalidatesTags: ['Likes', 'Post']
        }),

        deleteLike: builder.mutation<PostLike, { postId: number }>({
            query: ({ postId }) => ({
                url: `posts/${postId}/like`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Likes', 'Post']
        }),

        getAllHearts: builder.query<PostHeart[], void> ({
            query: () => ({
                url: 'hearts',
                method: 'GET'
            }),
            providesTags: ['Hearts']
        }),

        createHeart: builder.mutation<PostHeart, { postId: number }>({
            query: ({ postId }) => ({
                url: `posts/${postId}/heart`,
                method: 'POST'
            }),
            invalidatesTags: ['Hearts', 'Post']
        }),

        deleteHeart: builder.mutation<PostHeart, { postId: number }>({
            query: ({ postId }) => ({
                url: `posts/${postId}/heart`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Hearts', 'Post']
        }),
    }),
    overrideExisting: true
})

export const {
    useLazyGetAllPostsQuery,
    useGetAllPostsQuery,
    useMyPostsQuery, 
    useCreatePostMutation,
    useDeletePostMutation,
    useUpdatePostMutation,
    useViewPostMutation,

    useGetAllLikesQuery,
    useCreateLikeMutation,
    useDeleteLikeMutation,

    useGetAllHeartsQuery,
    useCreateHeartMutation,
    useDeleteHeartMutation
} = postApi