import * as yup from 'yup'

export const FormProofSchema = yup.object().shape({
  imageUrl: yup.string().required('Vui lòng chọn ảnh !')
})

export type FormProofType = yup.InferType<typeof FormProofSchema>
