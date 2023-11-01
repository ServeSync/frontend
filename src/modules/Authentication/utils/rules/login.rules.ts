import * as yup from 'yup'

export const FormLoginSchema = yup.object({
  userNameOrEmail: yup.string().trim().required('Vui lòng nhập Email hoặc Mã số sinh viên !'),
  password: yup.string().trim().required('Vui lòng nhập mật khẩu !')
})

export type FormLoginType = yup.InferType<typeof FormLoginSchema>
