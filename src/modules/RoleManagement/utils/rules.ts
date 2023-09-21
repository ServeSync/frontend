import * as yup from 'yup'

export const FormRoleSchema = yup.object({
  name: yup.string().required('Vui lòng tên của Role !')
})

export type FormRoleType = yup.InferType<typeof FormRoleSchema>
