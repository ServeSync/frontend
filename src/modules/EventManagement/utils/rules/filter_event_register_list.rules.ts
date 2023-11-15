import * as yup from 'yup'

export const FormFilterEventRegisterListSchema = yup.object({
  status: yup.string()
})

export type FormFilterEventRegisterListType = yup.InferType<typeof FormFilterEventRegisterListSchema>
