import { baseApi } from "@shared/api/baseApi";

export interface Album {
	id: number;
	name: string;
	is_shown: boolean;
	authorId: number;

	photos?: {
		id: number;
		image: string;
		albumId: number;
		is_shown: boolean
	}[];

	year: string

	theme: string
}

export interface CreateAlbumDto {
	name: string;
	theme: string;
	year: string;
}
export interface UpdateAlbumDto {
	name?: string;
	themeId?: number;
	yearId?: number;
	is_shown?: boolean
}
export const albumApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAlbums: builder.query<Album[], number>({
			query: (userId) => ({
				url: `albums/${userId}`,
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
		addAlbumPhoto: builder.mutation<void, { albumId: number; files: any[] }>({
			query: ({ albumId, files }) => {
				const formData = new FormData();

				files.forEach((file) => {
					formData.append("images", {
						uri: file.uri,
						name: file.name ?? "photo.jpg",
						type: file.type ?? "image/jpeg",
					} as any);
				});

				return {
					url: `upload/${albumId}`,
					method: "POST",
					body: formData,
				};
			},
			invalidatesTags: ["AlbumPhoto"],
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
