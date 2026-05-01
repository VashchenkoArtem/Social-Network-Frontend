export interface IUser {
	id: number;
	email: string;
	firstname: string | null;
	lastname: string | null;
	nickname: string | null;
	alias: string | null;
	avatars: IAvatar[]
	signature: string | null;
	birthDate: string | null;
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
