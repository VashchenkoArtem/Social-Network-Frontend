export interface User {
  id: number;
  firstname: string | null;
  lastname: string | null;
  nickname: string | null;
  email: string;
  avatar: string | null;
  signature: string | null;
  birthDate: string | null;
}

export type UserWithoutPassword = Omit<User, 'password'>;

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

export interface UpdateUserRequest extends Partial<Omit<User, 'id' | 'email'>> {
  password?: string;
}




export interface Album {
    id: number;
    title: string;
    isVisible: boolean;
    authorId: number;
    topicId: number;
    dateId: number;
    topic: {
        id: number;
        name: string;
    };
    createdAt: {
        id: number;
        createdAt: string;
    };
}

export interface Tag {
    id: number;
    name: string;
}

export interface CreateAlbumRequest {
    title: string;
    theme: string;
    year: string;
    isVisible: boolean;
}

export type UpdateAlbumRequest = Partial<CreateAlbumRequest>;

export interface IAlbumData {
    title: string;
    theme: string;
    year: string;
}