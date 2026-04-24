import AsyncStorage from "@react-native-async-storage/async-storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({

	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://192.168.0.106:8000",
		prepareHeaders: async (headers, { getState }) => {
			const token = await AsyncStorage.getItem("token");
			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}

			return headers;
		},
	}),
	tagTypes: ["User", "Album"],
	endpoints: () => ({}),
});
