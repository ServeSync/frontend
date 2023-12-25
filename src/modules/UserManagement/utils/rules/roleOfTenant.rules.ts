import * as yup from 'yup'

export const FormRoleOfTenantSchema = yup.object({
  id: yup.string()
})

export type FormRoleOfTenantType = yup.InferType<typeof FormRoleOfTenantSchema>
