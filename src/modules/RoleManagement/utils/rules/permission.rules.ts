import * as yup from 'yup'

export const FormPermissionSchema = yup.object({
  id: yup.string()
})

export type FormPermissionType = yup.InferType<typeof FormPermissionSchema>
