import * as yup from 'yup'

export const FormLoginSchema = yup.object({
  userNameOrEmail: yup.string().required('Vui lòng nhập Email hoặc Mã số sinh viên !'),
  password: yup.string().required('Vui lòng nhập mật khẩu !')
})

export type FormLoginType = yup.InferType<typeof FormLoginSchema>

export const FormForgetPasswordSchema = FormLoginSchema.omit(['password'])

export type FormForgetPasswordType = yup.InferType<typeof FormForgetPasswordSchema>

export const FormResetPasswordSchema = yup.object({
  newPassword: yup.string().required('Vui lòng nhập mật khẩu mới !'),
  confirmPassword: yup
    .string()
    .required('Vui lòng xác nhận mật khẩu !')
    .oneOf([yup.ref('newPassword')], 'Nhập lại mật khẩu không khớp')
})

export type FormResetPasswordType = yup.InferType<typeof FormResetPasswordSchema>
