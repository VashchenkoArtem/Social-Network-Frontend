import { IUser } from "@shared/types/user.types"

export interface Post {
    id: number 
    title: string
    topic: string
    content: string 
    photos?: PostPhoto[]
    tags?: Tag[] 
    author: IUser
    urls?: Url[] 
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