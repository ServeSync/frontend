import * as yup from 'yup'

export const FormSignInSchema = yup.object({
  userNameOrEmail: yup.string().trim().required('Vui lòng nhập Email hoặc Mã số sinh viên !'),
  password: yup.string().trim().required('Vui lòng nhập mật khẩu !')
})

export type FormSignInType = yup.InferType<typeof FormSignInSchema>
