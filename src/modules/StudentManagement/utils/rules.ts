import * as yup from 'yup'

export const FormStudentSchema = yup.object({
  code: yup
    .string()
    .required('Vui lòng nhập mã số sinh viên !')
    .max(9)
    .min(9)
    .required('Mã số sinh viên phải có 9 kí tự !'),
  fullName: yup.string().required('Vui lòng nhập tên !'),
  email: yup.string().required('Vui lòng nhập email !').email(),
  phone: yup.string().required('Vui lòng nhập số điện thoại !'),
  dateOfBirth: yup.string().required('Vui lòng chọn ngày sinh !'),
  gender: yup.boolean().required('Vui lòng chọn giới tính !'),
  address: yup.string().required('Vui lòng nhập địa chỉ !'),
  imageUrl: yup.string().required('Vui lòng chọn ảnh đại diện !'),
  homeTown: yup.string().required('Vui lòng nhập nơi sinh !'),
  citizenId: yup.string().required('Vui lòng nhập căn cước công dân !'),
  homeRoomId: yup.string().required('Vui lòng chọn lớp sinh hoạt !'),
  educationProgramId: yup.string().required('Vui lòng chọn hẹ đào tạo !'),
  facultyId: yup.string().required('Vui lòng chọn khoa !')
})

export type FormStudentType = yup.InferType<typeof FormStudentSchema>

export const FormFilterStudentSchema = yup.object({
  homeRoomId: yup.string(),
  facultyId: yup.string(),
  educationProgramId: yup.string(),
  gender: yup.boolean()
})

export type FormFilterStudentType = yup.InferType<typeof FormFilterStudentSchema>
