import { addHours, addMinutes } from 'date-fns'
import * as yup from 'yup'

export const FormEventSchema = yup.object().shape({
  name: yup.string().trim().required('Vui lòng nhập tên sự kiện !').min(10, 'Tên sự kiện ít nhất 10 kí tự !'),
  introduction: yup
    .string()
    .trim()
    .required('Vui lòng nhập giới thiệu sự kiện !')
    .min(10, 'Giới thiệu sự kiện ít nhất 10 kí tự !'),
  imageUrl: yup.string().required('Vui lòng chọn ảnh !'),
  startAt: yup
    .string()
    .required('Vui lòng nhập thời gian bắt đầu sự kiện !')
    .test('is-future', 'Ngày bắt đầu không được trong quá khứ', function (startAt) {
      const startDate = new Date(startAt)
      const now = new Date()
      return startDate > now
    }),
  endAt: yup
    .string()
    .required('Vui lòng nhập thời gian kết thúc sự kiện !')
    .test('minTime', 'Thời gian kết thúc phải sau thời gian bắt đầu ít nhất 1 giờ', function (endAt) {
      const startAt = this.parent.startAt
      if (!startAt || !endAt) {
        return true
      }
      const startDate = new Date(startAt)
      const endDate = new Date(endAt)
      const minTime = addHours(startDate, 1)
      return endDate >= minTime
    }),
  type: yup.string().required('Vui lòng chọn loại sự kiện !'),
  categoryId: yup.string().required('Vui lòng chọn danh mục sự kiện !'),
  activityId: yup.string().required('Vui lòng chọn hoạt động của sự kiện !'),
  address: yup.object().shape({
    fullAddress: yup.string().required('Vui lòng nhập tên địa điểm sự kiện!'),
    longitude: yup.string(),
    latitude: yup.string()
  }),
  description: yup.string().required('Vui lòng nhập mô tả sự kiện !').min(256, 'Mô tả sự kiện ít nhất 256 kí tự !'),
  registrationInfos: yup.array().of(
    yup.object().shape({
      startAt: yup.string().required('Vui lòng nhập thời gian bắt đầu đăng kí !'),
      // .test('is-future', 'Thời gian bắt đầu đăng kí không được ở quá khứ', function (startAt) {
      //   const startDate = new Date(startAt)
      //   const now = new Date()
      //   return startDate >= now
      // }),
      endAt: yup
        .string()
        .required('Vui lòng nhập thời gian kêt thúc đăng kí !')
        .test('minTime', 'Thời gian đăng kí ít nhất 15 phút', function (endAt) {
          const startAt = this.parent.startAt
          if (!startAt || !endAt) {
            return true
          }
          const startDate = new Date(startAt)
          const endDate = new Date(endAt)
          const minTime = addMinutes(startDate, 15)
          return endDate >= minTime
        })
    })
  ),
  attendanceInfos: yup.array().of(
    yup.object().shape({
      startAt: yup
        .string()
        .required('Vui lòng nhập thời gian bắt đầu điểm danh !')
        .test('is-future', 'Thời gian bắt đầu điểm danh không được ở quá khứ', function (startAt) {
          const startDate = new Date(startAt)
          const now = new Date()
          return startDate > now
        }),
      endAt: yup
        .string()
        .required('Vui lòng nhập thời gian kết thúc điểm danh !')
        .test('minTime', 'Thời gian điểm danh ít nhất 15 phút.', function (endAt) {
          const startAt = this.parent.startAt
          if (!startAt || !endAt) {
            return true
          }
          const startDate = new Date(startAt)
          const endDate = new Date(endAt)
          const minTime = addMinutes(startDate, 15)
          return endDate >= minTime
        })
    })
  ),
  roles: yup
    .object()
    .shape({
      name: yup.string(),
      description: yup.string(),
      isNeedApprove: yup.string(),
      score: yup.string(),
      quantity: yup.string()
    })
    .required('Vui lòng nhập vai trò sự kiện'),
  organizations: yup
    .object()
    .shape({
      organizationId: yup.string(),
      role: yup.string(),
      organizationReps: yup.object().shape({
        organizationRepId: yup.string(),
        role: yup.string()
      })
    })
    .required('Vui lòng nhập nhà tổ chức sự kiện'),
  representativeOrganizationId: yup.string().required('Vui lòng chọn đơn vị đại diện !')
})

export type FormEventType = yup.InferType<typeof FormEventSchema>
