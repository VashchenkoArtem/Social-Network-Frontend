import { useState } from "react";


interface RegisterPayload {
  email: string;
  password: string;
}

interface RegisterResponse {
  token: string;
  user: {
    id: number;
    email: string;
    nickname: string | null;
  };
}

interface ApiError {
  message: string;
}


export const useRegistration = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: RegisterPayload): Promise<RegisterResponse> => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch("http://192.168.0.125:8000/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        const errorData = result as ApiError;
        throw new Error(errorData.message || "Registration failed");
      }
      const successData = result as RegisterResponse;
      if (successData.token) {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem("token", successData.token);
        }
      }
      return successData; 
    } catch (error) {
      let errorMessage = "An unexpected error occurred";
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      console.error("Registration error:", errorMessage);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { register, isSubmitting, error };
};