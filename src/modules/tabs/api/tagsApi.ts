import { baseApi } from "@shared/api/baseApi";
import { Tag } from "./postApi";

export const tagApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTags: builder.query<Tag[], void>({
            query: () => "tags",
            providesTags: ["Tag"],
        }),
        createTag: builder.mutation<Tag, { name: string }>({
            query: (body) => ({
                url: "tags",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Tag"],
        }),
    }),
});

export const { useGetTagsQuery, useCreateTagMutation } = tagApi;