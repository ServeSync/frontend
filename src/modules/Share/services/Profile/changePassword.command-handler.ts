/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from '@tanstack/react-query'
import profileAPI from './profile.api'
import { FormChangePasswordType } from '../../utils'

class ChangePasswordCommandHandler {
  private _changePasswordMutation

  constructor() {
    this._changePasswordMutation = useMutation({
      mutationFn: (body: Omit<FormChangePasswordType, 'confirmPassword'>) => profileAPI.changePassword(body)
    })
  }

  handle = (body: Omit<FormChangePasswordType, 'confirmPassword'>, handleSuccess: any, handleError: any) => {
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
