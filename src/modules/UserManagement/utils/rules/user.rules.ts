import * as yup from 'yup'

export const FormFilterUserSchema = yup.object({
  search: yup.string().trim()
})

export type FormFilterUserType = yup.InferType<typeof FormFilterUserSchema>
