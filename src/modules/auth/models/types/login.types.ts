import { InferType } from "yup";
import { loginValidator } from "../lib/login.validation";

export type LoginForm = InferType<typeof loginValidator>