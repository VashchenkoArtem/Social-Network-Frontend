import { Post } from "@modules/posts/api/api.types";
import { IUser } from "@shared/types/user.types";

export interface IPost {
    title: string;
    content: string;
    author: IUser
}

export interface IProps {
    post: Post;
    isEditingPost: boolean
}