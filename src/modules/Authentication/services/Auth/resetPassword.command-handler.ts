/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from '@tanstack/react-query'
import authAPI from './auth.api'
import useQueryTokenConfig from '../../hooks/useQueryTokenConfig'

class ResetPasswordCommandHandler {
  private _resetPasswordMutation
  private _queryTokenConfig

  constructor() {
    this._queryTokenConfig = useQueryTokenConfig()
    this._resetPasswordMutation = useMutation({
      mutationFn: (body: { token: string; newPassword: string }) => authAPI.resetPassword(body)
    })
  }

  handle = (newPassword: string, handleSuccess: any, handleError: any) => {
    return this._resetPasswordMutation.mutate(
      {
        token: this._queryTokenConfig.token as string,
        newPassword: newPassword
      },
      {
        onSuccess: () => {
          handleSuccess()
        },
        onError: (error: any) => {
          handleError(error)
        }
      }
    )
  }

  isLoading() {
    return this._resetPasswordMutation.isLoading
  }
}

export { ResetPasswordCommandHandler }
