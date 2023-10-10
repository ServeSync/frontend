/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from '@tanstack/react-query'
import { FormLoginType } from '../../utils/rules'
import authAPI from './auth.api'

class LoginCommandHandler {
  private _loginMutation

  constructor() {
    this._loginMutation = useMutation({
      mutationFn: (body: FormLoginType) => authAPI.login(body)
    })
  }

  handle = (data: FormLoginType, handleSuccess: any, handleError: any) => {
    return this._loginMutation.mutate(data, {
      onSuccess: () => {
        handleSuccess()
      },
      onError: (error: any) => {
        handleError(error)
      }
    })
  }

  isLoading() {
    return this._loginMutation.isLoading
  }
}

export { LoginCommandHandler }
