import * as yup from 'yup'

export const FormEventSchema = yup.object({})

export type FormEventType = yup.InferType<typeof FormEventSchema>
