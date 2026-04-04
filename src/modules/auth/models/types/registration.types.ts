import { InferType } from "yup";
import { regValidator } from "../lib/registration.validation";

export type RegForm = InferType<typeof regValidator>;
