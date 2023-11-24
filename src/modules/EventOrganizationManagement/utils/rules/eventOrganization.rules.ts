import * as yup from 'yup'

export const FormEventOrganizationSchema = yup.object({
  name: yup.string().trim().required('Vui lòng nhập tên tổ chức !').min(5, 'Tên tổ chức tối thiểu 5 kí tự !'),
  description: yup.string().trim().required('Vui lòng nhập mô tả !'),
  email: yup.string().trim().required('Vui lòng nhập email !').email('Email không hợp lệ !'),
  phoneNumber: yup
    .string()
    .trim()
    .required('Vui lòng nhập số điện thoại !')
    .length(10, 'Số điện thoại không hợp lệ!')
    .matches(/^0[0-9]{9}$/, 'Số điện thoại không hợp lệ !'),
  address: yup.string().trim().required('Vui lòng nhập địa chỉ !'),
  imageUrl: yup.string().required('Vui lòng chọn ảnh !')
})

export type FormEventOrganizationType = yup.InferType<typeof FormEventOrganizationSchema>

export const FormFilterOrganizerSchema = yup.object({
  search: yup.string().trim()
})

export type FormFilterOrganizerType = yup.InferType<typeof FormFilterOrganizerSchema>
