import { baseApi } from '@shared/api/baseApi';
import { 
    Album, 
    Tag, 
    CreateAlbumRequest, 
    UpdateAlbumRequest 
} from './api.types';

export const albumsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAlbums: builder.query<Album[], void>({
            query: () => '/albums',
            providesTags: ['Albums'],
        }),
        getTags: builder.query<Tag[], void>({
            query: () => '/tags',
            providesTags: ['Albums'],
        }),
        createAlbum: builder.mutation<Album, CreateAlbumRequest>({
            query: (newAlbum) => ({
                url: '/albums',
                method: 'POST',
                body: newAlbum,
            }),
            invalidatesTags: ['Albums'],
        }),

        updateAlbum: builder.mutation<Album, { id: number } & Partial<CreateAlbumRequest>>({
            query: ({ id, ...data }) => ({
                url: `/albums/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Albums'],
        }),
    }),
});

export const { 
    useGetAlbumsQuery, 
    useGetTagsQuery, 
    useCreateAlbumMutation, 
    useUpdateAlbumMutation 
} = albumsApi;