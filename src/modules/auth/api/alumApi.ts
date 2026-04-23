import { baseApi } from "@shared/api/baseApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Photo = {
    id: number
    file: string
}

type Album = {
    id: number
    isVisible: boolean
    photos: Photo[]
}

export const albumApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        uploadPhoto: builder.mutation<any, { image: string }>({
            query: ({ image }) => {
                const formData = new FormData()

                formData.append("image", {
                    uri: image,
                    name: "photo.jpg",
                    type: "image/jpeg",
                } as any)

                return {
                    url: "album/upload",
                    method: "POST",
                    body: formData,
                }
            }
        }),

        deletePhoto: builder.mutation<any, { id: number }>({
            query: ({ id }) => ({
                url: `album/photo/${id}`,
                method: "DELETE"
            })
        }),

        albumVisibility: builder.mutation<any, { id: number }>({
            query: ({ id }) => ({
                url: `album/${id}/visibility`,
                method: "PATCH"
            })
        }),

        getAlbums: builder.query<Album[], void>({
            query: () => ({
                url: "album",
                method: "GET",
            }),
        })
    })
})

export const {
    useUploadPhotoMutation,
    useDeletePhotoMutation,
    useAlbumVisibilityMutation,
    useGetAlbumsQuery,
} = albumApi