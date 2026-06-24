import { IPost } from "../ui/postCard/types";

export interface IProfile{
    avatar?: string,
    birth_date?: string,
    is_image_signature?: boolean,
    is_text_signature: string,
    pseudonym?: string,
    signature?: string,
    user: {
        id: number;
        email: string;
        firstname: string | null;
        lastname: string | null;
        username: string | null;
    }
}
export interface Photo {
    id: number 
    userId: number | null 
    original_image: string 
    albumId: number | null 
    avatarForId: number | null 
    postId: number | null 
    isVisible: boolean 
}

export interface PostPhoto {
    id: number;
    original_image: string ;
    postId: number | null 
    compressed_image: string
}

export interface Tag {
    post_app_tag: {
        id: number
        name: string
    }
    post_id: number 
    tag_id: number 
}

export interface Url {
    id: number 
    post_id: number 
    url: string 
}

export interface CreatePostData {
    title: string
    topic: string;
    content: string
    authorId: number
    photos?: Photo
}

export interface PostsPayload{
    cursor?: number | null;
    limit?: number;
}

export interface UserPostsPayload {
    userId: number;
    cursor?: number | null;
    limit?: number;
}

export interface PostsResponse {
    data: IPost[];
    meta: {
        nextCursor: number | null;
        hasMore: boolean
    }
}

export interface PostLike {
    id: number
    user_id: number
    post_id: number
}

export interface PostHeart {
    id: number
    user_id: number
    post_id: number
}