import { IUser } from "@shared/types/user.types";

export type UserWithoutPassword = Omit<IUser, "password">;

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



export interface ReactNativeFile {
    uri: string;
    name: string;
    type: string;
}


export interface UpdateUserRequest extends Partial<Omit<IUser, "id" | "email">> {
	password?: string;
}
export interface ProfileData {
    first_name?: string;
    last_name?: string;
    username?: string;
    pseudonym?: string;
    email?: string;
    password?: string;
    avatar?:  ReactNativeFile;
    signature?: string | ReactNativeFile;
    birth_date?: string;
}


