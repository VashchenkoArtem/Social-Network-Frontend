import { IUser } from "@shared/types/user.types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useMeQuery } from "../api/userApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { socket } from "@shared/socket/socket";

interface IUserContext {
	user: IUser | null;
	token: string;
	setUpdatedToken: (token: string) => void;
	logout: () => void;
}

export const UserContext = createContext<IUserContext | null>(null);

interface IUserContextProvider {
	children: ReactNode;
}
export function useUserContext() {
	const { user } = useContext(UserContext)!
	if (user) {
		return {user}
	}
	return
}


export function UserProvider(props: IUserContextProvider) {
	const { children } = props;
	const [token, setToken] = useState<string>("");
	const [user, setUser] = useState<IUser | null>(null);

	const { data } = useMeQuery(undefined, {
		skip: !token,
		pollingInterval: 3000
	});

	useEffect(() => {
		async function loadToken() {
			const token = await AsyncStorage.getItem("token");
			if (token) setToken(token);
		}
		loadToken();
	}, []);

	useEffect(() => {
		if (data && token) {
			setUser({
				...data,
				id: Number(data.id)
			});
			socket.auth = { token: `Bearer ${token}` }
			socket.connect()
		} else if (!token) {
			setUser(null);
		}
	}, [data, token]);

	async function setUpdatedToken(newToken: string) {
		setToken(newToken);
		await AsyncStorage.setItem("token", newToken);
	}
	async function logout() {
		await AsyncStorage.removeItem("token");
		setToken("");
		setUser(null);
	}
	return (
		<UserContext value={{ user, token, setUpdatedToken, logout }}>
			{children}
		</UserContext>
	);
}