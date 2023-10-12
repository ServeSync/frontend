import * as yup from 'yup'

export const FormFilterEventSchema = yup.object({
  search: yup.string()
})

export type FormFilterEventType = yup.InferType<typeof FormFilterEventSchema>

export const FormEventSchema = yup.object({
  startTime: yup.string().required('Vui lòng nhập thời gian bắt đầu !'),
  startDate: yup.string().required('Vui lòng nhập ngày bắt đầu !'),
  endTime: yup.string().required('Vui lòng nhập thời gian kết thúc !'),
  endDate: yup.string().required('Vui lòng nhập ngày kết thúc !'),
  typeId: yup.string().required('Vui lòng nhập ngày kết thúc !'),
  categoryId: yup.string(),
  activityId: yup.string(),
  position: yup.string().required('Vui lòng nhập địa điểm !'),
  description: yup.string()
})

export type FormEventType = yup.InferType<typeof FormEventSchema>

export const FormRegisterEventSchema = yup.object({
  startTime: yup.string().required('Vui lòng nhập thời gian bắt đầu !'),
  startDate: yup.string().required('Vui lòng nhập ngày bắt đầu !'),
  endTime: yup.string().required('Vui lòng nhập thời gian kết thúc !'),
  endDate: yup.string().required('Vui lòng nhập ngày kết thúc !')
})

export type FormRegisterEventType = yup.InferType<typeof FormRegisterEventSchema>

export const FormEventRoleSchema = yup.object({
  name: yup.string().required('Vui lòng nhập tên vai trò của sự kiện !'),
  description: yup.string().required('Vui lòng nhập mô tả vai trò của sự kiện !'),
  quantity: yup.string().required('Vui lòng nhập số lượng tham gia !'),
  point: yup.string().required('Vui lòng nhập điểm !')
})

export type FormEventRoleType = yup.InferType<typeof FormEventRoleSchema>
