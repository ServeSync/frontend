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

export const FormRequestEventSchema = yup.object().shape({
  name: yup.string(),
  introduction: yup.string(),
  description: yup.string().required('Vui lòng nhập mô tả sự kiện !'),
  capacity: yup.string().required('Vui lòng nhập số !'),
  imageUrl: yup.string(),
  startAt: yup.string().required('Vui lòng nhập thời gian bắt đầu !'),
  endAt: yup.string().required('Vui lòng nhập thời gian kết thúc !'),
  eventType: yup.string().required('Vui lòng chọn loại sự kiện !'),
  activityId: yup.string().required('Vui lòng chọn hoạt động của sự kiện !'),
  address: yup.object().shape({
    fullAddress: yup.string(),
    longitude: yup.string(),
    latitude: yup.string()
  }),
  eventOrganizationInfo: yup.object().shape({
    name: yup.string().required('Vui lòng nhập tên tổ chức !'),
    description: yup.string().required('Vui lòng nhập mô tả tổ chức !'),
    email: yup.string().required('Vui lòng nhập email !'),
    phoneNumber: yup.string().required('Vui lòng nhập số điện thoại !'),
    address: yup.string().required('Vui lòng nhập địa chỉ !'),
    imageUrl: yup.string().required('Vui lòng chọn ảnh !')
  }),
  eventOrganizationContactInfo: yup.object().shape({
    name: yup.string().required('Vui lòng nhập tên người đại diện !'),
    email: yup.string().required('Vui lòng nhập email !'),
    phoneNumber: yup.string().required('Vui lòng nhập số điện thoại !'),
    gender: yup.boolean(),
    address: yup.string().required('Vui lòng nhập địa chỉ !'),
    birth: yup.string().required('Vui lòng nhập ngày sinh !'),
    position: yup.string().required('Vui lòng nhập chức vụ !'),
    imageUrl: yup.string().required('Vui lòng chọn ảnh !')
  })
})

export type FormRequestEventType = yup.InferType<typeof FormRequestEventSchema>
