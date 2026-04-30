import { InferType } from "yup";
import { createPostValidator } from "../lib/create-post.validation";

export type ICreatePostForm = InferType<typeof createPostValidator>;