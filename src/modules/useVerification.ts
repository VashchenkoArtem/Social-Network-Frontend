import { useState } from "react";



export const useVerification = () => {
  const [isVerifying, setIsVerifying] = useState(false);

  const verify = async (payload: { email: string; code: string;password: string }) => {
    setIsVerifying(true);
    try {
      const response = await fetch(`http://192.168.0.105:8000/registration`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      console.log(response)
      const result = await response.json();
      console.log(result)
      // if (!response.ok) throw new Error(result.message || result);

      // return result;
    } finally {
      setIsVerifying(false);
    }
  };

  return { verify, isVerifying };
};