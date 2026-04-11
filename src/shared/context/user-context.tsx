import { ILoginForm } from '@modules/auth/models/types/login.types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiError, RegisterPayload, RegisterResponse } from '@shared/types/auth.types';
import { IUser } from "@shared/types/user.types";
import { createContext, ReactNode, useEffect, useState } from "react";

interface UserContext{
    token: string;
    user: IUser | null;
    loginUser: (data: ILoginForm) => Promise<void>;
    register: (data: RegisterPayload) => Promise<void>;
}

export const UserContext = createContext<UserContext | null>(null);

interface UserContextProviderProps {
    children: ReactNode
}
export function UserProvider(props: UserContextProviderProps) {
    const { children } = props;
    const [ token, setToken ] = useState<string>("");
    const [ user, setUser ] = useState<IUser | null>(null);
    useEffect(() => {
	    async function me(){
			const response = await fetch("http://192.168.0.104:8000/me", {
				headers: {
					Authorization: `Bearer ${await AsyncStorage.getItem("token")}` 
				},
			})
			const result = await response.json()
			console.log(result, "me result")
			setUser(result)
		}
        me()
        console.log(token)
    },[token])

    async function loginUser(data: ILoginForm) {
		const response = await fetch("http://192.168.0.104:8000/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},

			body: JSON.stringify(data),
		});
		const result = await response.json();
		await AsyncStorage.setItem("token", result.token);
		return result;
	}
	async function register (data: RegisterPayload) {
		try {
			const response = await fetch("http://192.168.0.102:8000/send-code", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			const result = await response.json();
			console.log(result, "registration")
			if (!response.ok) {
				const errorData = result as ApiError;
				throw new Error(errorData.message || "Registration failed");
			}
			const successData = result as RegisterResponse;
			if (successData.token) {
				await AsyncStorage.setItem("token", successData.token);
			}
		} catch (error) {
			let errorMessage = "An unexpected error occurred";

			if (error instanceof Error) {
				errorMessage = error.message;
			}

			console.error("Registration error:", errorMessage);
			throw error;
		}
	};
    return (
        <UserContext value={{ token, user, loginUser, register }}>
            { children }
        </UserContext>
    )
}