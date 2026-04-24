import { baseApi } from "@shared/api/baseApi";
import {
	RegistrationData,
	AuthToken,
	User,
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
				const formData = new FormData();

				if (body.firstname) formData.append("firstname", body.firstname);
				if (body.lastname) formData.append("lastname", body.lastname);
				if (body.nickname) formData.append("nickname", body.nickname);
				if (body.email) formData.append("email", body.email);
				if (body.birthDate) formData.append("birthDate", body.birthDate);
				if (body.password) formData.append("password", body.password);

				if (body.avatar) {
					formData.append("file", {
						uri: body.avatar,
						name: "avatar.jpg",
						type: "image/jpeg",
					} as any);
				}
				return {
					url: "update-user",
					method: "PATCH",
					body: formData,
				};
			},
			invalidatesTags: ["User"],
		}),
		updatePassword: builder.mutation<User, ProfileData>({
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
		updateUserSignature: builder.mutation<User, {signature: string}>({
			query: (body) => {
				const formData = new FormData()
				formData.append("file", {
					uri: body.signature,
					name: "signature.jpg",
					type: "image/jpeg"
				} as any)
				return {
					url: "signature",
					method: "PATCH",
					body: formData
				}
			}
		})
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
	useUpdateUserSignatureMutation
} = userApi;
