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
		isVisible: boolean
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
				url: `albums/${id}/visibility`,
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
		deleteAlbum: builder.mutation<Album, { id: number }>({
			query: ({ id }) => ({
				url: `albums/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Album"],
		}),
		deletePhoto: builder.mutation<void, { photoId: number }>({
			query: ({ photoId }) => ({
				url: `photo/${photoId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Album"],
		}),
		togglePhotoVisibility: builder.mutation<{ isVisible: boolean },{ photoId: number; isVisible: boolean }>({
			query: ( { photoId, isVisible }) => {
				return {
				url: `photo/${photoId}/visibility`,
				method: "PATCH",
				body: { isVisible }
			}}
		})
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
	useDeletePhotoMutation,
	useDeleteAlbumMutation,
	useTogglePhotoVisibilityMutation
} = albumApi;
