import * as yup from 'yup'

export const FormEventSchema = yup.object({
  name: yup.string().required('Vui lòng nhập tên sự kiện !'),
  introduction: yup.string().required('Vui lòng nhập giới thiệu sự kiện !'),
  imageUrl: yup.string().required('Vui lòng chọn ảnh !'),
  startAt: yup.string().required('Vui lòng nhập thời gian bắt đầu !'),
  endAt: yup.string().required('Vui lòng nhập thời gian kết thúc !'),
  type: yup.string().required('Vui lòng chọn loại sự kiện !'),
  categoryId: yup.string().required('Vui lòng chọn danh mục sự kiện !'),
  activityId: yup.string().required('Vui lòng chọn hoạt động của sự kiện !'),
  description: yup.string().required('Vui lòng nhập mô tả sự kiện !'),
  address: yup.string().required('Vui lòng nhập địa điểm !')
})

export type FormEventType = yup.InferType<typeof FormEventSchema>

export const FormRegisterEventSchema = yup.object({
  registerStartAt: yup.string().required('Vui lòng nhập thời gian bắt đầu !'),
  registerEndAt: yup.string().required('Vui lòng nhập ngày bắt đầu !')
})

export type FormRegisterEventType = yup.InferType<typeof FormRegisterEventSchema>

export const FormEventRoleSchema = yup.object({
  name: yup.string().required('Vui lòng nhập tên vai trò !'),
  description: yup.string().required('Vui lòng nhập mô tả vai trò !'),
  quantity: yup.string().required('Vui lòng nhập số lượng tham gia !'),
  score: yup.string().required('Vui lòng nhập điểm !'),
  isNeedApprove: yup.string().required('Vui lòng chọn trạng thái phê duyệt !')
})

export type FormEventRoleType = yup.InferType<typeof FormEventRoleSchema>

export const FormFilterEventSchema = yup.object({
  startAt: yup.string(),
  endAt: yup.string(),
  type: yup.string(),
  status: yup.string(),
  search: yup.string()
})

export type FormFilterEventType = yup.InferType<typeof FormFilterEventSchema>
