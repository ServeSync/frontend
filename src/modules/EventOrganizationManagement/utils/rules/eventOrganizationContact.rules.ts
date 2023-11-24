import * as yup from 'yup'

export const FormEventOrganizationContactSchema = yup.object({
  name: yup.string().trim().required('Vui lòng nhập tên thành viên !').min(5, 'Tên thành viên tối thiểu 5 kí tự !'),
  birth: yup
    .string()
    .required('Vui lòng chọn ngày sinh !')
    .test('is_before_today', 'Ngày sinh phải bé hơn ngày hiện tại !', function (value) {
      if (!value) {
        return true
      }
      const birth = new Date(value)
      const today = new Date()
      return birth < today
    }),
  email: yup.string().trim().required('Vui lòng nhập email !').email('Email không hợp lệ !'),
  phoneNumber: yup
    .string()
    .trim()
    .required('Vui lòng nhập số điện thoại !')
    .length(10, 'Số điện thoại không hợp lệ!')
    .matches(/^0[0-9]{9}$/, 'Số điện thoại không hợp lệ !'),
  gender: yup.string().required('Vui lòng chọn giới tính !'),
  address: yup.string().trim().required('Vui lòng nhập địa chỉ !'),
  position: yup.string().trim().required('Vui lòng nhập chức vụ !'),
  imageUrl: yup.string().required('Vui lòng chọn ảnh !')
})

export type FormEventOrganizationContactType = yup.InferType<typeof FormEventOrganizationContactSchema>
