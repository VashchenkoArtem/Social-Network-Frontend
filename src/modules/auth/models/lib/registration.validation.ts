import * as yup from "yup";

export const regValidator = yup.object({
	email: yup
		.string()
		.email("Невірний формат електронної пошти")
		.required("Введи електронну пошту")
		.min(10, "Мінімум 10 символів")
		.max(100, "Максимум 100 символів")
		.matches(
			/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
			"Невірний формат електронної пошти",
		),

	password: yup
		.string()
		.required("Введи пароль")
		.min(6, "Мінімум 6 символів")
		.max(100, "Максимум 100 символів")
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
			"Пароль повинен містити щонайменше 6 символів, одну літеру та одну цифру",
		),

	confirmPassword: yup
		.string()
		.required("Підтверди пароль")
		.oneOf([yup.ref("password")], "Паролі не збігаються"),
});
