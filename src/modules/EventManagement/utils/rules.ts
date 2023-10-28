/* eslint-disable @typescript-eslint/no-explicit-any */
import { addHours, addMinutes } from 'date-fns'
import * as yup from 'yup'

export const FormEventSchema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập tên sự kiện !').min(10, 'Tên sự kiện ít nhất 10 kí tự !'),
  introduction: yup
    .string()
    .required('Vui lòng nhập giới thiệu sự kiện !')
    .min(10, 'Giới thiệu sự kiện ít nhất 10 kí tự !'),
  imageUrl: yup.string(),
  startAt: yup.string().required('Vui lòng nhập thời gian bắt đầu sự kiện !'),
  endAt: yup
    .string()
    .required('Vui lòng nhập thời gian kết thúc sự kiện !')
    .test('endAt', 'Thời gian kết thúc phải sau thời gian bắt đầu ít nhất 1 giờ', function (endAt) {
      const startAt = this.parent.startAt
      if (!startAt || !endAt) {
        return true
      }
      const startAtDate = new Date(startAt)
      const endAtDate = new Date(endAt)
      const minimumEndAtDate = addHours(startAtDate, 1)
      return endAtDate > minimumEndAtDate
    }),
  type: yup.string().required('Vui lòng chọn loại sự kiện !'),
  categoryId: yup.string().required('Vui lòng chọn danh mục sự kiện !'),
  activityId: yup.string().required('Vui lòng chọn hoạt động của sự kiện !'),
  address: yup.object().shape({
    fullAddress: yup.string().required('Vui lòng nhập tên địa điểm sự kiện!'),
    longitude: yup.string().required('Vui lòng nhập kinh độ diễn ra sự kiện!'),
    latitude: yup.string().required('Vui lòng nhập vĩ độ diễn ra sự kiện!')
  }),
  description: yup.string().required('Vui lòng nhập mô tả sự kiện !').min(256, 'Mô tả sự kiện ít nhất 256 kí tự !'),
  registrationInfos: yup.array().of(
    yup
      .object()
      .shape({
        startAt: yup.string().required('Vui lòng nhập thời gian bắt đầu thời gian đăng kí !'),
        endAt: yup
          .string()
          .required('Vui lòng nhập thời gian kêt thúc thời gian đăng kí !')
          .test('uniqueTimes', 'Thời gian đăng kí ít nhất 15 phút', function (endAt) {
            const startAt = this.parent.startAt
            if (!startAt || !endAt) {
              return true
            }
            const startAtDate = new Date(startAt)
            const endAtDate = new Date(endAt)
            const minimumEndAtDate = addMinutes(startAtDate, 15)
            return endAtDate > minimumEndAtDate
          })
      })
      .required('Vui lòng nhập thời gian đăng kí')
  ),
  attendanceInfos: yup.array().of(
    yup.object().shape({
      startAt: yup.string().required('Vui lòng nhập thời gian bắt đầu điểm danh !'),
      endAt: yup
        .string()
        .required('Vui lòng nhập thời gian kết thúc điểm danh !')
        .test('uniqueTimes', 'Thời gian điểm danh ít nhất 15 phút.', function (endAt) {
          const startAt = this.parent.startAt
          if (!startAt || !endAt) {
            return true
          }
          const startAtDate = new Date(startAt)
          const endAtDate = new Date(endAt)
          const minimumEndAtDate = addMinutes(startAtDate, 15)
          return endAtDate > minimumEndAtDate
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

export const FormFilterEventSchema = yup.object({
  startAt: yup.string(),
  endAt: yup.string(),
  type: yup.string(),
  status: yup.string(),
  search: yup.string().trim()
})

export type FormFilterEventType = yup.InferType<typeof FormFilterEventSchema>

export const FormSearchMapSchema = yup.object({
  address: yup.string().required('Vui lòng nhập địa điểm !')
})

export type FormSearchMapType = yup.InferType<typeof FormSearchMapSchema>
