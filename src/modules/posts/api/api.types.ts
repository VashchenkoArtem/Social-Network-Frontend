import { IUser } from "@shared/types/user.types"

export interface Post {
    id: number 
    title: string
    topic: string
    content: string 
    photos?: PostPhoto[]
    tags?: Tag[] 
    author: IProfile
    urls?: Url[] 
}
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
}

export interface Tag {
    tag: {
        id: number
        name: string
    }
    postId: number 
    tagId: number 
}

export interface Url {
    id: number 
    postId: number 
    href: string 
}

export interface CreatePostData {
    title: string
    topic: string;
    content: string
    authorId: number
    photos?: Photo
}