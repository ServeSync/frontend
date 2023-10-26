import * as yup from 'yup'

export const FormEventSchema = yup.object().shape({
  name: yup.string(),
  introduction: yup.string(),
  imageUrl: yup.string(),
  startAt: yup.string(),
  endAt: yup.string(),
  type: yup.string(),
  categoryId: yup.string(),
  activityId: yup.string(),
  address: yup.object().shape({
    fullAddress: yup.string(),
    longitude: yup.string(),
    latitude: yup.string()
  }),
  description: yup.string(),
  registrationInfos: yup.array().of(
    yup.object().shape({
      startAt: yup.string(),
      endAt: yup.string()
    })
  ),
  attendanceInfos: yup.array().of(
    yup.object().shape({
      startAt: yup.string(),
      endAt: yup.string()
    })
  ),
  roles: yup.object().shape({
    name: yup.string(),
    description: yup.string(),
    isNeedApprove: yup.string(),
    score: yup.string(),
    quantity: yup.string()
  }),
  organizations: yup.object().shape({
    organizationId: yup.string(),
    role: yup.string(),
    organizationReps: yup.array().of(
      yup.object().shape({
        organizationRepId: yup.string(),
        role: yup.string()
      })
    )
  })
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

// Phan cua Ngoc Nguyen

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const today = new Date()

export const FormRequestEventSchema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập tên sự kiện !').min(10, 'Tên sự kiện phải tối thiểu 10 kí tự!'),
  introduction: yup.string().required('Vui lòng nhập giới thiệu sự kiện !'),
  description: yup.string().required('Vui lòng nhập mô tả sự kiện !'),
  capacity: yup.string().required('Vui lòng nhập số lượng người tham gia !'),
  imageUrl: yup.string(),
  startAt: yup.string().required('Vui lòng nhập thời gian bắt đầu !'),
  endAt: yup.string().required('Vui lòng nhập thời gian kết thúc !'),
  eventType: yup.string().required('Vui lòng chọn loại sự kiện !'),
  categoryId: yup.string().required('Vui lòng chọn chủ đề !'),
  activityId: yup.string().required('Vui lòng chọn hoạt động !'),
  address: yup.object().shape({
    fullAddress: yup.string().required('Vui lòng nhập địa chỉ !'),
    longitude: yup.string(),
    latitude: yup.string()
  }),
  eventOrganizationInfo: yup.object().shape({
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
    imageUrl: yup.string()
  }),
  eventOrganizationContactInfo: yup.object().shape({
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
    imageUrl: yup.string()
  })
})

export type FormRequestEventType = yup.InferType<typeof FormRequestEventSchema>
