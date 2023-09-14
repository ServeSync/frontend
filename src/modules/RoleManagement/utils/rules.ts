import * as yup from 'yup'

export const RoleSchema = yup.object({
  name: yup.string().required('Vui lòng tên của Role !')
})

export type RoleType = yup.InferType<typeof RoleSchema>
