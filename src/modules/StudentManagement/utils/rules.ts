import * as yup from 'yup'

export const FormStudentSchema = yup.object({
  code: yup.string().required('Vui lòng nhập mã số sinh viên !').length(9, 'Mã số sinh viên không hợp lệ!'),
  fullName: yup.string().required('Vui lòng nhập tên !'),
  email: yup.string().required('Vui lòng nhập email !').email('Email không hợp lệ !'),
  gender: yup.boolean(),
  birth: yup.string().required('Vui lòng chọn ngày sinh !'),
  phone: yup.string().required('Vui lòng nhập số điện thoại !').length(10, 'Số điện thoại không hợp lệ!'),
  homeTown: yup.string().required('Vui lòng nhập nơi sinh !'),
  address: yup.string().required('Vui lòng nhập địa chỉ !'),
  citizenId: yup.string().required('Vui lòng nhập căn cước công dân !'),
  facultyId: yup.string().required('Vui lòng chọn khoa !'),
  homeRoomId: yup.string().required('Vui lòng chọn lớp sinh hoạt !'),
  educationProgramId: yup.string().required('Vui lòng chọn hệ đào tạo !'),
  imageUrl: yup.object()
})

export type FormStudentType = yup.InferType<typeof FormStudentSchema>

export const FormFilterStudentSchema = yup.object({
  homeRoomId: yup.string(),
  facultyId: yup.string(),
  educationProgramId: yup.string(),
  gender: yup.boolean()
})

export type FormFilterStudentType = yup.InferType<typeof FormFilterStudentSchema>
