import * as yup from 'yup'

export const InputSearchSchema = yup.object({
  search: yup.string().trim()
})

export type InputSearchType = yup.InferType<typeof InputSearchSchema>
