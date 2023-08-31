import * as yup from 'yup'

export const LoginSchema = yup.object({
  email: yup
    .string()
    .required('Vui lòng nhập Email')
    .email('Email không hợp lệ')
    .min(1, 'Độ dài Email tối thiểu 1 kí tự'),
  password: yup.string().required('Vui lòng nhập Password').min(1, 'Mật khẩu tối thiểu 1 ký tự')
})

export type LoginSchemaType = yup.InferType<typeof LoginSchema>
