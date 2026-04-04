import { LoginForm } from "@modules/auth/models/types/login.types";
import { router } from "expo-router";

export function useLogin(){
    async function loginUser (data: LoginForm){
        const response = await fetch("http://192.168.0.125:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(data)
        });
        const result = await response.json();
        console.log(result)
        return result
    }
    return { loginUser }
}