import * as yup from "yup";

export const createPostValidator = yup.object({
    title: yup
        .string()
        .min(3)
        .max(250)
        .required("Введіть назву поста"),

    topic: yup
        .string()
        .min(3)
        .max(100)
        .required("Введіть тему поста"),

    content: yup
        .string()
        .min(10)
        .max(1000)
        .required("Додайте опис поста"),
    tags: yup.array().default([]),
    links: yup.array().default([])
    // photo: yup
        // .string()
        // .nullable()
        // .optional()
});