import * as yup from 'yup'

export const FormRegisterEventSchema = yup.object().shape({
  description: yup.string().trim().min(10, 'Giới thiệu sự kiện ít nhất 10 kí tự !')
})

export type FormRegisterEventType = yup.InferType<typeof FormRegisterEventSchema>
