import { IAlbum } from "@shared/ui/albumsModal/types";

export interface IUser {
	id: number;
	email: string;
	first_name?: string;
	last_name?: string;
	username?: string;
	profile_app_profile: IProfile
}
export interface IProfile {
	id: number
	pseudonym: string;
	avatar?: string
	signature?: string;
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