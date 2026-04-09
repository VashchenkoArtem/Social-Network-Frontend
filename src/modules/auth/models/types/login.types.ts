import { InferType } from "yup";
import { loginValidator } from "../lib/login.validation";

export type ILoginForm = InferType<typeof loginValidator>;
