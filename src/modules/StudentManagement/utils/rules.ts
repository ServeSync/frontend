import * as yup from 'yup'

export const FormStudentSchema = yup.object({
  name: yup.string().required('Vui lòng tên của sinh viên !')
})

export type FormStudentType = yup.InferType<typeof FormStudentSchema>
