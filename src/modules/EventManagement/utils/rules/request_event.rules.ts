/* eslint-disable @typescript-eslint/no-explicit-any */
import { addHours } from 'date-fns'
import * as yup from 'yup'

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const today = new Date()

export const FormRequestEventSchema = yup.object().shape({
  name: yup.string().trim().required('Vui lòng nhập tên sự kiện !').min(10, 'Tên sự kiện phải tối thiểu 10 kí tự!'),
  introduction: yup
    .string()
    .trim()
    .required('Vui lòng nhập giới thiệu sự kiện !')
    .min(10, 'Giới thiệu sự kiện ít nhất 10 kí tự !')
    .max(128, 'Giới thiệu sự kiện tối đa 128 kí tự !'),
  description: yup.string().required('Vui lòng nhập mô tả sự kiện !').min(256, 'Mô tả sự kiện ít nhất 256 kí tự !'),
  capacity: yup
    .string()
    .required('Vui lòng nhập số lượng tham gia !')
    .matches(/^[1-9]\d*$/, 'Vui lòng nhập số lượng lớn hơn 0'),
  imageUrl: yup.string().required('Vui lòng chọn ảnh!'),
  startAt: yup
    .string()
    .required('Vui lòng nhập thời gian bắt đầu sự kiện!')
    .test('is-future', 'Ngày bắt đầu phải sau ngày hiện tại 24h', function (startAt) {
      const startDate = new Date(startAt)
      const now = new Date()
      const minStartDate = new Date(now.getTime() + 24 * 60 * 60 * 1000)
      return startDate > minStartDate
    }),
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
      const minTime = addHours(startAtDate, 1)
      return endAtDate > minTime
    }),
  eventType: yup.string().required('Vui lòng chọn loại sự kiện !'),
  categoryId: yup.string().required('Vui lòng chọn danh mục sự kiện !'),
  activityId: yup.string().required('Vui lòng chọn hoạt động !'),
  address: yup.object().shape({
    fullAddress: yup.string().required('Vui lòng nhập địa chỉ !'),
    longitude: yup.string().required('Vui lòng nhập kinh độ!'),
    latitude: yup.string().required('Vui lòng nhập vĩ độ !')
  }),
  EventOrganizationInfo: yup.object().shape({
    name: yup.string().required('Vui lòng nhập tên tổ chức !'),
    description: yup.string().required('Vui lòng nhập mô tả tổ chức !'),
    email: yup.string().trim().required('Vui lòng nhập email !').email('Email không hợp lệ !'),
    phoneNumber: yup
      .string()
      .trim()
      .required('Vui lòng nhập số điện thoại !')
      .length(10, 'Số điện thoại không hợp lệ!')
      .matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
    address: yup.string().required('Vui lòng nhập địa chỉ !'),
    imageUrl: yup.string().required('Vui lòng chọn ảnh!')
  }),
  EventOrganizationContactInfo: yup
    .object()
    .shape({
      name: yup.string().required('Vui lòng nhập tên người đại diện !'),
      email: yup.string().trim().required('Vui lòng nhập email !').email('Email không hợp lệ !'),
      phoneNumber: yup
        .string()
        .trim()
        .required('Vui lòng nhập số điện thoại !')
        .length(10, 'Số điện thoại không hợp lệ!')
        .matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
      gender: yup.string().required('Vui lòng chọn giới tính !'),
      birth: yup
        .string()
        .required('Vui lòng chọn ngày sinh !')
        .test('is-before-today', 'Ngày sinh phải bé hơn ngày hiện tại !', function (value) {
          if (!value) {
            return true
          }
          const dob = new Date(value)
          return dob < today
        }),
      eventType: yup.string().required('Vui lòng chọn loại sự kiện !'),
      categoryId: yup.string().required('Vui lòng chọn danh mục sự kiện !'),
      activityId: yup.string().required('Vui lòng chọn hoạt động !'),
      address: yup.object().shape({
        fullAddress: yup.string().required('Vui lòng nhập địa chỉ !'),
        longitude: yup.string().required('Vui lòng nhập kinh độ!'),
        latitude: yup.string().required('Vui lòng nhập vĩ độ !')
      }),
      EventOrganizationInfo: yup.object().shape({
        name: yup.string().required('Vui lòng nhập tên tổ chức !'),
        description: yup.string().required('Vui lòng nhập mô tả tổ chức !'),
        email: yup.string().trim().required('Vui lòng nhập email !').email('Email không hợp lệ !'),
        phoneNumber: yup
          .string()
          .trim()
          .required('Vui lòng nhập số điện thoại !')
          .length(10, 'Số điện thoại không hợp lệ!')
          .matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
        address: yup.string().required('Vui lòng nhập địa chỉ !'),
        imageUrl: yup.string().required('Vui lòng chọn ảnh!')
      }),
      EventOrganizationContactInfo: yup.object().shape({
        name: yup.string().required('Vui lòng nhập tên người đại diện !'),
        email: yup.string().trim().required('Vui lòng nhập email !').email('Email không hợp lệ !'),
        phoneNumber: yup
          .string()
          .trim()
          .required('Vui lòng nhập số điện thoại !')
          .length(10, 'Số điện thoại không hợp lệ!')
          .matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
        gender: yup.string().required('Vui lòng chọn giới tính !'),
        address: yup.string().required('Vui lòng nhập địa chỉ !'),
        birth: yup
          .string()
          .required('Vui lòng chọn ngày sinh !')
          .test('is-before-today', 'Ngày sinh phải bé hơn ngày hiện tại !', function (value) {
            if (!value) {
              return true
            }
            const dob = new Date(value)
            return dob < today
          }),
        position: yup.string().required('Vui lòng nhập chức vụ !'),
        imageUrl: yup.string().required('Vui lòng chọn ảnh!')
      })
    })
    .test('is-emails-different', 'Email của tổ chức và người đại diện không được trùng nhau!', function (value) {
      const organizationInfoEmail = this.parent.EventOrganizationInfo.email
      const contactInfoEmail = this.parent.EventOrganizationContactInfo.email
      if (organizationInfoEmail && contactInfoEmail && organizationInfoEmail === contactInfoEmail) {
        throw new yup.ValidationError(
          'Email của tổ chức và người đại diện không được trùng nhau!',
          value,
          'EventOrganizationContactInfo.email'
        )
      }
    })
})

export type FormRequestEventType = yup.InferType<typeof FormRequestEventSchema>
