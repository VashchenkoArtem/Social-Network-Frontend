export interface User {
	id: number;
	firstname: string | null;
	lastname: string | null;
	nickname: string | null;
	alias: string | null;
	email: string;
	avatar: string | null;
	signature: string | null;
	birthDate: string | null;
}

export type UserWithoutPassword = Omit<User, "password">;

export interface RegistrationData {
	email: string;
	password?: string;
	code: string;
}

export interface LoginData {
	email: string;
	password?: string;
}

export interface AuthToken {
	token: string;
}

export interface MessageResponse {
	message: string;
}


export interface UpdateUserRequest extends Partial<Omit<User, "id" | "email">> {
	password?: string;
}
export interface ProfileData {
	firstname?: string;
	lastname?: string;
	nickname?: string;
	alias?: string;
	email?: string;
	password?: string;
	avatar?: string;
	signature?: string;
	birthDate?: string;
}
