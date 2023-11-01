import * as yup from 'yup'

export const FormResetPasswordSchema = yup.object({
  newPassword: yup.string().trim().required('Vui lòng nhập mật khẩu mới !'),
  confirmPassword: yup
    .string()
    .trim()
    .required('Vui lòng xác nhận mật khẩu !')
    .oneOf([yup.ref('newPassword')], 'Nhập lại mật khẩu không khớp')
})

export type FormResetPasswordType = yup.InferType<typeof FormResetPasswordSchema>
