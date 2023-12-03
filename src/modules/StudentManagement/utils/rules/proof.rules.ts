import * as yup from 'yup'

export const FormProofInternalSchema = yup.object().shape({
  eventId: yup.string().required('Vui lòng chọn sự kiện !'),
  eventRoleId: yup.string().required('Vui lòng chọn vai trò trong sự kiện !'),
  description: yup.string().required('Vui lòng nhập mô tả !').min(10, 'Mô tả có ít nhất 10 kí tự !'),
  imageUrl: yup.string().required('Vui lòng chọn ảnh !'),
  attendanceAt: yup.string().required('Vui lòng chọn ngày đã điểm đanh !')
})

export type FormProofInternalType = yup.InferType<typeof FormProofInternalSchema>

export const FormProofExternalSchema = yup.object().shape({
  eventName: yup.string().required('Vui lòng nhập tên sự kiện !'),
  address: yup.string().required('Vui lòng nhập địa chỉ sự kiện !'),
  organizationName: yup.string().required('Vui lòng nhập tên nhà tổ chức sự kiện !'),
  startAt: yup.string().required('Vui lòng chọn ngày bắt đầu sự kiện !'),
  endAt: yup.string().required('Vui lòng chọn ngày kết thúc sự kiện !'),
  attendanceAt: yup.string().required('Vui lòng chọn ngày đã điểm đanh !'),
  role: yup.string().required('Vui lòng nhập vai trò trong sự kiện !'),
  score: yup.string().required('Vui lòng nhập điểm !'),
  // activityId: yup.string().required('Vui lòng chọn hoạt động !'),
  description: yup.string().required('Vui lòng nhập mô tả !').min(10, 'Mô tả có ít nhất 10 kí tự !'),
  imageUrl: yup.string().required('Vui lòng chọn ảnh !')
})

export type FormProofExternalType = yup.InferType<typeof FormProofExternalSchema>

export const FormRejectProofSchema = yup.object().shape({
  rejectReason: yup.string().required('Vui lòng nhập lý do !').min(10, 'Lý do có ít nhất 10 kí tự !')
})

export type FormRejectProofType = yup.InferType<typeof FormRejectProofSchema>
