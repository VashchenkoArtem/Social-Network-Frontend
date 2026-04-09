import { baseApi } from '@shared/api/baseApi';
import { RegistrationData, AuthToken, User } from './api.types';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendCode: builder.mutation<{ message: string }, { email: string }>({
      query: (body) => ({
        url: '/send-code',
        method: 'POST',
        body,
      }),
    }),
    registration: builder.mutation<AuthToken, RegistrationData>({
      query: (body) => ({
        url: '/registration',
        method: 'POST',
        body,
      }),
    }),
    updateUserInfo: builder.mutation<User, { firstname: string; nickname: string }>({
      query: (body) => ({
        url: '/update-user',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation<User, { firstname?: string; nickname?: string; signature?: string }>({
      query: (body) => ({
        url: '/user/update',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { 
  useSendCodeMutation, 
  useRegistrationMutation, 
  useUpdateUserInfoMutation, 
  useUpdateUserMutation 
} = userApi;