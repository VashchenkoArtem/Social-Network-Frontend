import * as yup from "yup"

export const regValidator = yup.object ({
    email: yup.string().email().required().min(10).max(100).label("Електронна пошта").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Невірний формат електронної пошти"),
    password: yup.string().required().min(6).max(100).label("Пароль").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, "Пароль повинен містити принаймні 6 символів, одну літеру та одну цифру"),
    // confiramation-password: yup.string().required().min(6).max(100).label("Підтверди пароль").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, "Пароль повинен містити принаймні 6 символів, одну літеру та одну цифру")
})
