import * as yup from 'yup'
import { FormLoginSchema } from './login.rules'

export const FormForgetPasswordSchema = FormLoginSchema.omit(['password'])

export type FormForgetPasswordType = yup.InferType<typeof FormForgetPasswordSchema>
