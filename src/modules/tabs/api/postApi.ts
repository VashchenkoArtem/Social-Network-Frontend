import { baseApi } from "@shared/api/baseApi";


export interface Photo {
    id: number;
    filename: string;
}

export interface PostUrl {
    id: number;
    href: string;
    postId: number;
}

export interface Tag {
    id: number;
    name: string;
}

export interface TagOnPost {
    tagId: number;
    postId: number;
    tag: Tag;
}

export interface Author {
    id: number;
    email: string;
    avatars?: Photo[];
}


export interface Post {
    id: number;
    title: string;
    content: string;
    topic: string;
    authorId: number;
    author: Author;
    urls: PostUrl[];
    photos: Photo[];
    tags: TagOnPost[];
    createdAt: string;
}

export interface CreatePostRequest {
    title: string;
    content: string;
    topic: string;
    urls: string[];
    tagNames: string[];
}

export interface GetPostsParams {
    take?: number;
}

export const postApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPosts: builder.query<Post[], GetPostsParams>({
            query: ({ take = 5 }) => ({
                url: "posts",
                params: { take },
            }),
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: "Post" as const, id })), { type: "Post", id: "LIST" }]
                    : [{ type: "Post", id: "LIST" }],
        }),

        getMyPosts: builder.query<Post[], void>({
            query: () => "posts/my",
            providesTags: ["Post"],
        }),

        createPost: builder.mutation<Post, CreatePostRequest>({
            query: (body) => ({
                url: "posts",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "Post", id: "LIST" }],
        }),
    }),
});

export const { 
    useGetPostsQuery, 
    useGetMyPostsQuery, 
    useCreatePostMutation 
} = postApi;