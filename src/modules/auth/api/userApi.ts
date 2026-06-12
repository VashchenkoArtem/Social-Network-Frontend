import { baseApi } from "@shared/api/baseApi";
import {
	RegistrationData,
	AuthToken,
	ProfileData,
	LoginData,
} from "./api.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "@shared/types/user.types";

export const userApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		sendCode: builder.mutation<{ message: string },{ email: string; message: string }>({
			query: (body) => ({
				url: "send-code",
				method: "POST",
				body,
			}),
		}),
		registration: builder.mutation<AuthToken, RegistrationData>({
			query: (body) => ({
				url: "registration",
				method: "POST",
				body,
			}),
			onCacheEntryAdded: async (arg, api) => {
				const { data } = await api.cacheDataLoaded;
				AsyncStorage.setItem("token", data.token);
			},
			invalidatesTags: ["User", "Album"]
		}),
		login: builder.mutation<AuthToken, LoginData>({
			query: (body) => ({
				url: "login",
				method: "POST",
				body,
			}),
			onCacheEntryAdded: async (arg, api) => {
				const { data } = await api.cacheDataLoaded;
				AsyncStorage.setItem("token", data.token);
			},
		}),
		updateUserInfo: builder.mutation<void, ProfileData>({
			query: (ProfileData) => ({
				url: 'update-user',
				method: 'PATCH',
				body: ProfileData,
			}),
			invalidatesTags: ["User", "Album"],
		}),
		updatePassword: builder.mutation<IUser, ProfileData>({
			query: (body) => {
				return {
					url: "update-password",
					method: "PATCH",
					body,
				};
			},
			invalidatesTags: ["User"],
		}),
		me: builder.query<IUser, void>({
			query: () => ({
				url: "me",
				method: "GET",
			}),
			providesTags: ["User"],
		}),
		updateUserSignature: builder.mutation<IUser, { signature: string }>({
            query: ({ signature }) => {
                const formData = new FormData();
                formData.append("signature", {
                    uri: signature,
                    name: "signature.jpg",
                    type: "image/jpeg"
                } as any);

                return {
                    url: "signature",
                    method: "PATCH",
                    body: formData
                };
            },
            invalidatesTags: ["User"],
        }),
		updateUser: builder.mutation<IUser, { firstname?: string; nickname?: string; signature?: string }>({
		  query: (body) => ({
		    url: '/update-user',
		    method: 'POST',
		    body,
		  }),
		  invalidatesTags: ['User'],
		}),
	}),
	overrideExisting: true,
});

export const {
	useSendCodeMutation,
	useRegistrationMutation,
	useUpdateUserInfoMutation,
	useUpdatePasswordMutation,
	useMeQuery,
	useLoginMutation,
	useUpdateUserSignatureMutation
} = userApi;
