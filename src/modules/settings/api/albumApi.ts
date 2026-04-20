import { baseApi } from "@shared/api/baseApi";

export interface Album {
	id: number;
	title: string;
	isVisible: boolean;
	authorId: number;

	photos: {
		id: number;
		filename: string;
		albumId: number;
	}[];

	year: {
		id: number;
		year: string;
	};

	topic: {
		id: number;
		name: string;
	};
}

export interface CreateAlbumDto {
	title: string;
	topicId: number;
	yearId: number;
}
export interface UpdateAlbumDto {
	title?: string;
	topicId?: number;
	yearId?: number;
	isVisible?: boolean
}
export const albumApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAlbums: builder.query<Album[], void>({
			query: () => ({
				url: "albums",
				method: "GET",
			}),
			providesTags: ["Album"],
		}),

		createAlbum: builder.mutation<Album, CreateAlbumDto>({
			query: (body) => ({
				url: "albums",
				method: "POST",
				body,
			}),
			invalidatesTags: ["Album"],
		}),

		updateAlbum: builder.mutation<Album, { id: number; data: UpdateAlbumDto }>({
			query: ({ id, data }) => ({
				url: `albums/${id}`,
				method: "PATCH",
				body: data,
			}),
			invalidatesTags: ["Album"],
		}),

		toggleVisibility: builder.mutation<Album, { id: number }>({
			query: ({ id }) => ({
				url: `${id}`,
				method: "PATCH",
			}),
			invalidatesTags: ["Album"],
		}),
		getYears: builder.query<{ id: number; year: string }[], void>({
			query: () => ({
				url: "years",
				method: "GET",
			}),
		}),
		getTopics: builder.query<{ id: number; name: string }[], void>({
			query: () => ({
				url: "tags",
				method: "GET",
			}),
		}),
		addAlbumPhoto: builder.mutation<void, { albumId: number; file: any }>({
			query: ({ albumId, file }) => {
				const formData = new FormData();
				console.log(file.uri, albumId);
				formData.append("image", {
					uri: file.uri,
					name: "avatar.jpg",
					type: "image/jpeg",
				} as any);

				return {
					url: `upload/${albumId}`,
					method: "POST",
					body: formData,
				};
			},
		}),
	}),
});

export const {
	useGetAlbumsQuery,
	useCreateAlbumMutation,
	useUpdateAlbumMutation,
	useToggleVisibilityMutation,
	useGetYearsQuery,
	useGetTopicsQuery,
	useAddAlbumPhotoMutation,
} = albumApi;
