import AsyncStorage from "@react-native-async-storage/async-storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NGROK_SERVER_URL, SERVER, SERVER_URL } from "@shared/constants/server";

export const baseApi = createApi({

	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: SERVER_URL,
		prepareHeaders: async (headers, { getState }) => {
			const token = await AsyncStorage.getItem("token");
			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
        
			return headers;
		},
	}),
	tagTypes: ["User", "Album", "Post", "Tag", "AlbumPhoto", "GroupChats", "Likes", "Hearts", 'RecommendedUsers', 'RequestedUsers'],
	endpoints: () => ({}),
});
