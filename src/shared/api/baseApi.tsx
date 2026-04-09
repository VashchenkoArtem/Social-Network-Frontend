import { Update } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser, UpdateUser } from '@shared/types/user.types';

type IUserWithoutPassword = Omit<IUser, "password">;

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    tagTypes: ["User"],

    endpoints: (builder) => ({
        updateUser: builder.mutation<IUserWithoutPassword, UpdateUser>({
            query: (body) => ({
                url: 'user', 
                method: 'PATCH', 
                body: body,
            }),
            invalidatesTags: ["User"]
        }),
    }),
})

export const { useUpdateUserMutation } = baseApi