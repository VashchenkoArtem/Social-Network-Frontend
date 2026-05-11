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
			const response = await fetch(`http://192.168.1.110:8000/registration`, {
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
