import * as yup from "yup";

export const loginValidator = yup.object({
	email: yup
		.string()
		.email("Невірний формат електронної пошти")
		.required("Введи електронну пошту")
		.min(10, "Мінімум 10 символів")
		.max(100, "Максимум 100 символів"),

	password: yup
		.string()
		.required("Введи пароль")
		.min(6, "Мінімум 6 символів")
		.max(100, "Максимум 100 символів")
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)/,
			"Пароль повинен містити хоча б одну літеру та одну цифру",
		),
});
