import { IAlbum } from "@shared/ui/albumsModal/types";

export interface IUser {
	id: number;
	email: string;
	firstname: string | null;
	lastname: string | null;
	username: string | null;
	profile: IProfile
	avatar?: IAvatar[];
}
export interface IProfile {
	pseudonym: string | null;
	avatar: string | null
	signature: string | null;
	birth_date: string | null;
	is_text_signature: boolean;
	is_image_signature: boolean | null;
	albums?: IAlbum[] 
}
export interface IAvatar{
	id: number;
	filename: string;
	albumId?: number;
	userId?: number;
	avatarForId: number;
	isVisible: boolean
	}
export interface UpdateUser {
	name?: string;
	email?: string;
	birthDate?: string;
	password?: string;
}
