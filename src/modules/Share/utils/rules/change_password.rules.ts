import * as yup from 'yup'

export const FormChangePasswordSchema = yup.object({
  currentPassword: yup
    .string()
    .trim()
    .required('Vui lòng nhập mật khẩu hiện tại !')
    .min(6, 'Mật khẩu hiện tại ít nhất 6 kí tự !'),
  newPassword: yup.string().trim().required('Vui lòng nhập mật khẩu mới !').min(6, 'Mật khẩu mới ít nhất 6 kí tự !')
})

export type FormChangePasswordType = yup.InferType<typeof FormChangePasswordSchema>
