import * as yup from 'yup'
import { FormSignInSchema } from './sign_in.rules'

export const FormForgetPasswordSchema = FormSignInSchema.omit(['password'])

export type FormForgetPasswordType = yup.InferType<typeof FormForgetPasswordSchema>
