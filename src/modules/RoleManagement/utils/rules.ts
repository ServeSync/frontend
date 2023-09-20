import * as yup from 'yup'

export const RoleSchema = yup.object({
  name: yup.string().required('Vui lòng tên của Role !')
})

export type RoleType = yup.InferType<typeof RoleSchema>

export const PermissionSchema = yup.object({
  id: yup.string()
})
export type PermissionType = yup.InferType<typeof PermissionSchema>
