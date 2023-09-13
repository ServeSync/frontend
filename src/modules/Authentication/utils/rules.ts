import * as yup from 'yup'

export const LoginSchema = yup.object({
  userNameOrEmail: yup.string().required('Vui lòng nhập Email hoặc Mã số sinh viên !'),
  password: yup.string().required('Vui lòng nhập mật khẩu !')
})

export type LoginType = yup.InferType<typeof LoginSchema>
