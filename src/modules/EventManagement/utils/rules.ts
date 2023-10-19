import * as yup from 'yup'

// export const FormEventSchema = yup.object().shape({
//   name: yup.string().required('Vui lòng nhập tên sự kiện !'),
//   introduction: yup.string().required('Vui lòng nhập giới thiệu sự kiện !'),
//   description: yup.string().required('Vui lòng nhập mô tả sự kiện !'),
//   imageUrl: yup.string().required('Vui lòng chọn ảnh !'),
//   startAt: yup.string().required('Vui lòng nhập thời gian bắt đầu !'),
//   endAt: yup.string().required('Vui lòng nhập thời gian kết thúc !'),
//   type: yup.string().required('Vui lòng chọn loại sự kiện !'),
//   categoryId: yup.string().required('Vui lòng chọn danh mục sự kiện !'),
//   activityId: yup.string().required('Vui lòng chọn hoạt động của sự kiện !'),
//   address: yup.object().shape({
//     fullAddress: yup.string().required('Vui lòng nhập địa điểm !'),
//     longitude: yup.string(),
//     latitude: yup.string()
//   }),
//   roles: yup.array().of(
//     yup.object().shape({
//       name: yup.string().required('Vui lòng nhập tên vai trò !'),
//       description: yup.string().required('Vui lòng nhập mô tả vai trò !'),
//       isNeedApprove: yup.string().required('Vui lòng chọn trạng thái phê duyệt !'),
//       score: yup.string().required('Vui lòng nhập điểm !'),
//       quantity: yup.string().required('Vui lòng nhập số lượng tham gia !')
//     })
//   ),
//   attendanceInfos: yup.array().of(
//     yup.object().shape({
//       startAt: yup.string().required('Vui lòng nhập thời gian bắt đầu tham gia!'),
//       endAt: yup.string().required('Vui lòng nhập thời gian hoàn tất tham gia!')
//     })
//   ),
//   organizations: yup.array().of(
//     yup.object().shape({
//       organizationId: yup.string().required('Vui lòng chọn nhà tổ chức sự kiện !'),
//       role: yup.string().required('Vui lòng nhập vai trò nhà tổ chức sự kiện !'),
//       organizationReps: yup.array().of(
//         yup.object().shape({
//           organizationRepId: yup.string().required('Vui lòng chọn đại diện cho nhà tổ chức sự kiện !'),
//           role: yup.string().required('Vui lòng nhập vai trò của đại diện cho nhà tổ chức sự kiện !')
//         })
//       )
//     })
//   ),
//   registrationInfos: yup.array().of(
//     yup.object().shape({
//       startAt: yup.string().required('Vui lòng nhập thời gian bắt đầu đăng kí tham gia !'),
//       endAt: yup.string().required('Vui lòng nhập thời gian hoàn tất đăng kí tham gia !')
//     })
//   )
// })

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
    name: yup.string().required('Vui lòng nhập tên vai trò !'),
    description: yup.string().required('Vui lòng nhập mô tả vai trò !'),
    isNeedApprove: yup.string().required('Vui lòng chọn trạng thái phê duyệt !'),
    score: yup.string().required('Vui lòng nhập điểm !'),
    quantity: yup.string().required('Vui lòng nhập số lượng tham gia !')
  }),
  organizations: yup.object().shape({
    organizationId: yup.string().required('Vui lòng chọn nhà tổ chức sự kiện !'),
    role: yup.string().required('Vui lòng nhập vai trò nhà tổ chức sự kiện !'),
    organizationReps: yup.object().shape({
      organizationRepId: yup.string().required('Vui lòng chọn đại diện cho nhà tổ chức sự kiện !'),
      role: yup.string().required('Vui lòng nhập vai trò của đại diện cho nhà tổ chức sự kiện !')
    })
  })
})

export type FormEventType = yup.InferType<typeof FormEventSchema>

export const FormFilterEventSchema = yup.object({
  startAt: yup.string(),
  endAt: yup.string(),
  type: yup.string(),
  status: yup.string(),
  search: yup.string()
})

export type FormFilterEventType = yup.InferType<typeof FormFilterEventSchema>

// Phan cua Ngoc Nguyen

export const FormRequestEventSchema = yup.object().shape({
  name: yup.string(),
  introduction: yup.string(),
  description: yup.string().required('Vui lòng nhập mô tả sự kiện !'),
  capacity: yup.number().required('Vui lòng nhập số lượng !'),
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
