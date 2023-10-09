/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from '@tanstack/react-query'
import { FormLoginType } from '../../utils/rules'
import authAPI from './auth.api'

class LoginCommandHandler {
  private LoginMutation

  constructor() {
    this.LoginMutation = useMutation({
      mutationFn: (body: FormLoginType) => authAPI.login(body)
    })
  }

  handle = (data: FormLoginType, handleSuccess: any, handleError: any) => {
    return this.LoginMutation.mutate(data, {
      onSuccess: () => {
        handleSuccess()
      },
      onError: (error: any) => {
        handleError(error)
      }
    })
  }

  isLoading() {
    return this.LoginMutation.isLoading
  }
}

export { LoginCommandHandler }
