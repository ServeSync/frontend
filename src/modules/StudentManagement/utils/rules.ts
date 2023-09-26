import * as yup from 'yup'

export const FormStudentSchema = yup.object({
  name: yup.string().required('Vui lòng tên của sinh viên !')
})

export type FormStudentType = yup.InferType<typeof FormStudentSchema>

export const FormFilterStudentSchema = yup.object({
  homeRoomId: yup.string(),
  facultyId: yup.string(),
  educationProgramId: yup.string(),
  gender: yup.boolean()
})

export type FormFilterStudentType = yup.InferType<typeof FormFilterStudentSchema>
