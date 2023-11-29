import * as yup from 'yup'
export const FormProfileStudentSchema = yup.object({
  email: yup.string().trim().required('Vui lòng nhập Email !').email('Email không hợp lệ !'),
  phone: yup
    .string()
    .trim()
    .required('Vui lòng nhập số điện thoại !')
    .length(10, 'Số điện thoại không hợp lệ !')
    .matches(/^0[0-9]{9}$/, 'Số điện thoại không hợp lệ !'),
  homeTown: yup.string().trim().required('Vui lòng nhập nơi sinh !'),
  address: yup.string().trim().required('Vui lòng nhập địa chỉ !'),
  imageUrl: yup.string().required('Vui lòng chọn ảnh !')
})

export type FormProfileStudentType = yup.InferType<typeof FormProfileStudentSchema>
