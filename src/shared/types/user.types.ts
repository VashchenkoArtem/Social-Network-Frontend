export interface IUser {
    id: number;
    email: string;
    firstname: string | null;
    lastname: string | null;
    nickname: string | null;
    avatar: string | null;
    signature: string | null;
    birthDate: Date | null;
}

export interface UpdateUser {
    name?: string;
    email?: string;
    birthDate?: string;
    password?: string;
}