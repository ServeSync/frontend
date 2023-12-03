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
  eventName: yup.string().required('Vui lòng nhập tên sự kiện !').min(10, 'Tên sự kiên có ít nhất 10 kí tự !'),
  address: yup.string().required('Vui lòng nhập địa chỉ sự kiện !').min(10, 'Địa chỉ sự kiên có ít nhất 10 kí tự !'),
  organizationName: yup
    .string()
    .required('Vui lòng nhập tên nhà tổ chức sự kiện !')
    .min(10, 'Tên nhà tổ chức sự kiên có ít nhất 10 kí tự !'),
  startAt: yup
    .string()
    .required('Vui lòng chọn ngày bắt đầu sự kiện !')
    .test('is-past', 'Ngày bắt đầu phải trong quá khứ', function (startAt) {
      const startDate = new Date(startAt)
      const now = new Date()
      return startDate < now
    }),
  endAt: yup
    .string()
    .required('Vui lòng chọn ngày kết thúc sự kiện !')
    .test('is-past', 'Ngày kết thúc phải trong quá khứ', function (endAt) {
      const endDate = new Date(endAt)
      const now = new Date()
      return endDate < now
    })
    .test('minTime', 'Thời gian kết thúc phải sau thời gian bắt đầu', function (endAt) {
      const startAt = this.parent.startAt
      if (!startAt || !endAt) {
        return true
      }
      const startDate = new Date(startAt)
      const endDate = new Date(endAt)
      return endDate > startDate
    }),
  attendanceAt: yup.string().required('Vui lòng chọn ngày đã điểm danh !'),
  role: yup.string().required('Vui lòng nhập vai trò trong sự kiện !').min(5, 'Vai trò sự kiên có ít nhất 5 kí tự !'),
  score: yup
    .string()
    .required('Vui lòng nhập điểm !')
    .matches(/^[1-9]\d*$/, 'Vui lòng nhập một số nguyên dương'),
  activityId: yup.string().required('Vui lòng chọn hoạt động !'),
  description: yup.string().required('Vui lòng nhập mô tả !').min(10, 'Mô tả có ít nhất 10 kí tự !'),
  imageUrl: yup.string().required('Vui lòng chọn ảnh !')
})

export type FormProofExternalType = yup.InferType<typeof FormProofExternalSchema>

export const FormProofSpecialSchema = yup.object().shape({
  title: yup.string().required('Vui lòng nhập tiêu đề minh chứng !').min(10, 'Tiêu đề có ít nhất 10 kí tự !'),
  startAt: yup
    .string()
    .required('Vui lòng chọn ngày bắt đầu sự kiện !')
    .test('is-past', 'Ngày bắt đầu phải trong quá khứ', function (startAt) {
      const startDate = new Date(startAt)
      const now = new Date()
      return startDate < now
    }),
  endAt: yup
    .string()
    .required('Vui lòng chọn ngày kết thúc sự kiện !')
    .test('is-past', 'Ngày kết thúc phải trong quá khứ', function (endAt) {
      const endDate = new Date(endAt)
      const now = new Date()
      return endDate < now
    })
    .test('minTime', 'Thời gian kết thúc phải sau thời gian bắt đầu', function (endAt) {
      const startAt = this.parent.startAt
      if (!startAt || !endAt) {
        return true
      }
      const startDate = new Date(startAt)
      const endDate = new Date(endAt)
      return endDate > startDate
    }),
  role: yup.string().required('Vui lòng nhập vai trò !').min(5, 'Vai trò có ít nhất 5 kí tự !'),
  score: yup
    .string()
    .required('Vui lòng nhập điểm !')
    .matches(/^[1-9]\d*$/, 'Vui lòng nhập một số nguyên dương'),
  activityId: yup.string().required('Vui lòng chọn hoạt động !'),
  description: yup.string().required('Vui lòng nhập mô tả !').min(10, 'Mô tả có ít nhất 10 kí tự !'),
  imageUrl: yup.string().required('Vui lòng chọn ảnh !')
})

export type FormProofSpecialType = yup.InferType<typeof FormProofSpecialSchema>
