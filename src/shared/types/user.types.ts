export interface IUser {
	id: number;
	email: string;
	firstname: string | null;
	lastname: string | null;
	nickname: string | null;
	alias: string | null;
	avatar: string | null;
	signature: string | null;
	birthDate: string | null;
}

export interface UpdateUser {
	name?: string;
	email?: string;
	birthDate?: string;
	password?: string;
}
