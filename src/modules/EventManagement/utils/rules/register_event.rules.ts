import * as yup from 'yup'

export const FormRegisterEventSchema = yup.object().shape({
  description: yup
    .string()
    .trim()
    .required('Vui lòng nhập lời giới thiệu !')
    .min(10, 'Lời giới thiệu bản thân ít nhất 10 kí tự !')
})

export type FormRegisterEventType = yup.InferType<typeof FormRegisterEventSchema>
