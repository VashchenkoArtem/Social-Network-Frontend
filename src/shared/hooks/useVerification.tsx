import { SERVER_URL } from "@shared/constants/server";
import { useState } from "react";

export const useVerification = () => {
	const [isVerifying, setIsVerifying] = useState(false);

	const verify = async (payload: {
		email: string;
		code: string;
		password: string;
	}) => {
		setIsVerifying(true);
		try {
			const response = await fetch(`${SERVER_URL}/registration`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});
			const result = await response.json();
			return result;
		} finally {
			setIsVerifying(false);
		}
	};

	return { verify, isVerifying };
};
