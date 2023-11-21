/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from '@tanstack/react-query'
import { FormChangePasswordType } from '../../utils'
import profileAPI from './profile.api'

class ChangePasswordCommandHandler {
  private _changePasswordMutation

  constructor() {
    this._changePasswordMutation = useMutation({
      mutationFn: (body: FormChangePasswordType) => profileAPI.changePassword(body)
    })
  }

  handle = (body: FormChangePasswordType, handleSuccess: any, handleError: any) => {
    return this._changePasswordMutation.mutate(body, {
      onSuccess: () => {
        handleSuccess()
      },
      onError: (error: any) => {
        handleError(error)
      }
    })
  }

  isLoading() {
    return this._changePasswordMutation.isLoading
  }
}

export { ChangePasswordCommandHandler }
