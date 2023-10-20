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
