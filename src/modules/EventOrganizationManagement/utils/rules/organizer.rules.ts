import * as yup from 'yup'

export const FormFilterOrganizerSchema = yup.object({
  name: yup.string(),
  email: yup.string(),
  phoneNumber: yup.string(),
  address: yup.string(),
  search: yup.string().trim()
})

export type FormFilterOrganizerType = yup.InferType<typeof FormFilterOrganizerSchema>
