/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from '@tanstack/react-query'
import authAPI from './auth.api'

class ResetPasswordCommandHandler {
  private ResetPasswordMutation

  constructor() {
    this.ResetPasswordMutation = useMutation({
      mutationFn: (body: { token: string; newPassword: string }) => authAPI.resetPassword(body)
    })
  }

  handle = (data: { token: string; newPassword: string }, handleSuccess: any, handleError: any) => {
    return this.ResetPasswordMutation.mutate(data, {
      onSuccess: () => {
        handleSuccess()
      },
      onError: (error: any) => {
        handleError(error)
      }
    })
  }

  isLoading() {
    return this.ResetPasswordMutation.isLoading
  }
}

export { ResetPasswordCommandHandler }
