export interface RegisterPayload {
	email: string;
	password: string;
}

export interface RegisterResponse {
	token: string;
	user: {
		id: number;
		email: string;
		nickname: string | null;
	};
}

export interface ApiError {
	message: string;
}
