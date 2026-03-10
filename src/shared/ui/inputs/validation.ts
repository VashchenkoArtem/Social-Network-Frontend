import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .required('Електронна пошта обовʼязкова')
    .email('Неправильний формат пошти'),
  password: yup
    .string()
    .required('Пароль обовʼязковий')
    .min(6, 'Пароль має бути не менше 6 символів'),
});


export type LoginFormData = yup.InferType<typeof loginSchema>;