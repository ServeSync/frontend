import * as yup from 'yup'

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const FormStudentSchema = yup.object({
  code: yup.string().trim().required('Vui lòng nhập mã số sinh viên !').length(9, 'Mã số sinh viên không hợp lệ!'),
  fullName: yup.string().trim().required('Vui lòng nhập tên !').min(5, 'Họ và tên tối thiểu 5 kí tự'),
  email: yup.string().trim().required('Vui lòng nhập Email !').email('Email không hợp lệ !'),
  gender: yup.string().required('Vui lòng chọn giới tính !'),
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
  phone: yup
    .string()
    .trim()
    .required('Vui lòng nhập số điện thoại !')
    .length(10, 'Số điện thoại không hợp lệ!')
    .matches(phoneRegExp, 'Số điện thoại không hợp lệ !'),
  homeTown: yup.string().trim().required('Vui lòng nhập nơi sinh !'),
  address: yup.string().trim().required('Vui lòng nhập địa chỉ !'),
  citizenId: yup.string().trim().required('Vui lòng nhập căn cước công dân !'),
  facultyId: yup.string().required('Vui lòng chọn khoa !'),
  homeRoomId: yup.string().required('Vui lòng chọn lớp sinh hoạt !'),
  educationProgramId: yup.string().required('Vui lòng chọn hệ đào tạo !'),
  imageUrl: yup.string()
})

export type FormStudentType = yup.InferType<typeof FormStudentSchema>

export const FormFilterStudentSchema = yup.object({
  homeRoomId: yup.string(),
  facultyId: yup.string(),
  educationProgramId: yup.string(),
  gender: yup.string(),
  search: yup.string().trim()
})

export type FormFilterStudentType = yup.InferType<typeof FormFilterStudentSchema>
