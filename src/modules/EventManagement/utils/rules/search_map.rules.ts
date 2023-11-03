import * as yup from 'yup'

export const FormSearchMapSchema = yup.object({
  address: yup.string().trim().required('Vui lòng nhập địa điểm !')
})

export type FormSearchMapType = yup.InferType<typeof FormSearchMapSchema>
