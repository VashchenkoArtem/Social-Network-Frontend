import { PostPhoto, Tag, Url } from "@modules/posts/api/api.types";
import { IUser } from "@shared/types/user.types";

export interface IPost {
    id: number 
    title: string;
    topic: string
    content: string;
    user_app_user: {
        id: number,
        profile_app_profile: {
            id: number,
            avatar?: string,
            pseudonym?: string,
            signature?: string
        }
    }
    post_app_postimage?: PostPhoto[]
    post_app_post_tags?: Tag[]
    post_app_postlink?: Url[]
    _count?: {
        post_app_postlike: number;
        post_app_postheart: number;
        post_app_postview: number;
    }
}

export interface IProps {
    post: IPost;
    isEditingPost: boolean;
    isOnlineUser?: boolean
}