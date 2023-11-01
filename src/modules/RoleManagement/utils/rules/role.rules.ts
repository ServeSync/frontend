import * as yup from 'yup'

export const FormRoleSchema = yup.object({
  name: yup.string().trim().required('Vui lòng nhập tên của Role !')
})

export type FormRoleType = yup.InferType<typeof FormRoleSchema>
