import * as yup from 'yup'

export const FormRejectRegistrationSchema = yup.object().shape({
  rejectReason: yup
    .string()
    .trim()
    .required('Vui lòng nhập lí do từ chối !')
    .min(10, 'Lí do từ chối ít nhất 10 kí tự !')
})

export type FormRejectRegistrationEventType = yup.InferType<typeof FormRejectRegistrationSchema>
