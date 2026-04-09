import AsyncStorage from '@react-native-async-storage/async-storage';
import { Update } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser, UpdateUser } from '@shared/types/user.types';

type IUserWithoutPassword = Omit<IUser, "password">;

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.0.105:8000', 
        prepareHeaders: async (headers) => {
            const token = await AsyncStorage.getItem('token')
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
        }
     }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        updateUser: builder.mutation<IUserWithoutPassword, UpdateUser>({
            query: (body) => ({
                url: 'update-user', 
                method: 'PATCH', 
                body: body,
            }),
            invalidatesTags: ["User"]
        }),
    }),
})

export const { useUpdateUserMutation } = baseApi