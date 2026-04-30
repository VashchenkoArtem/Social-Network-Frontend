import AsyncStorage from "@react-native-async-storage/async-storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER } from "@shared/constants/server";

export const baseApi = createApi({

	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: `http://${SERVER.host}:${SERVER.port}`,
		prepareHeaders: async (headers, { getState }) => {
			const token = await AsyncStorage.getItem("token");
			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}

			return headers;
		},
	}),
	tagTypes: ["User", "Album", "Post", "Tag"],
	endpoints: () => ({}),
});
