import { PostPhoto, Tag, Url } from "@modules/posts/api/api.types";
import { IUser } from "@shared/types/user.types";

export interface IPost {
    id: number 
    title: string;
    topic: string
    content: string;
    user_app_user: IUser
    post_app_postimage?: PostPhoto[]
    post_app_post_tags?: Tag[]
    post_app_postlink?: Url[]
}

export interface IProps {
    post: IPost;
    isEditingPost: boolean
}