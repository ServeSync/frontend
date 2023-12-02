import * as yup from 'yup'

export const FormFilterProofSchema = yup.object({
  status: yup.string(),
  type: yup.string(),
  search: yup.string().trim()
})

export type FormFilterProofType = yup.InferType<typeof FormFilterProofSchema>
