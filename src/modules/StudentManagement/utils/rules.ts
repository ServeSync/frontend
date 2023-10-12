import * as yup from 'yup'

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const today = new Date()

export const FormStudentSchema = yup.object({
  code: yup.string().required('Vui lòng nhập mã số sinh viên !').length(9, 'Mã số sinh viên không hợp lệ!'),
  fullName: yup.string().required('Vui lòng nhập tên !').min(5, 'Họ và tên tối thiểu 5 kí tự'),
  email: yup.string().required('Vui lòng nhập email !').email('Email không hợp lệ !'),
  gender: yup.boolean(),
  birth: yup
    .string()
    .required('Vui lòng chọn ngày sinh !')
    .test('is-before-today', 'Ngày sinh phải bé hơn ngày hiện tại !', function (value) {
      if (!value) {
        return true
      }
      const dob = new Date(value)
      return dob < today
    }),
  phone: yup
    .string()
    .required('Vui lòng nhập số điện thoại !')
    .length(10, 'Số điện thoại không hợp lệ!')
    .matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
  homeTown: yup.string().required('Vui lòng nhập nơi sinh !'),
  address: yup.string().required('Vui lòng nhập địa chỉ !'),
  citizenId: yup.string().required('Vui lòng nhập căn cước công dân !'),
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
  search: yup.string()
})

export type FormFilterStudentType = yup.InferType<typeof FormFilterStudentSchema>
