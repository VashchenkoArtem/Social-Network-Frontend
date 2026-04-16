import { baseApi } from "@shared/api/baseApi";
import {
	RegistrationData,
	AuthToken,
	User,
	ProfileData,
	LoginData,
} from "./api.types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const userApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		sendCode: builder.mutation<
			{ message: string },
			{ email: string; message: string }
		>({
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
		updateUserInfo: builder.mutation<User, ProfileData>({
			query: (body) => {
				if (body.avatar) {
					const formData = new FormData();
					formData.append("avatar", {
						uri: body.avatar,
						name: "avatar.jpg",
						type: "image/jpeg",
					} as unknown as Blob);
					console.log(formData);
				}

				return {
					url: "update-user",
					method: "PATCH",
					body,
				};
			},
			invalidatesTags: ["User"],
		}),
		updatePassword: builder.mutation<User, ProfileData>({
			query: (body) => ({
				url: "update-password",
				method: "PATCH",
				body,
			}),
			invalidatesTags: ["User"],
		}),
		me: builder.query<User, void>({
			query: () => ({
				url: "me",
				method: "GET",
			}),
			providesTags: ["User"],
		}),
		// updateUser: builder.mutation<User, { firstname?: string; nickname?: string; signature?: string }>({
		//   query: (body) => ({
		//     url: '/update-user',
		//     method: 'POST',
		//     body,
		//   }),
		//   invalidatesTags: ['User'],
		// }),
	}),
});

export const {
	useSendCodeMutation,
	useRegistrationMutation,
	useUpdateUserInfoMutation,
	useUpdatePasswordMutation,
	useMeQuery,
	useLoginMutation,
} = userApi;