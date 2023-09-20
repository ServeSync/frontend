import * as yup from 'yup'
export const PermissionSchema = yup.object({
  id: yup.string()
})
export type PermissionType = yup.InferType<typeof PermissionSchema>
