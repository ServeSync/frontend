/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import studentAPI from './student.api'
import { FormRejectRegistrationEventType } from '../../utils'

class RejectRegistrationCommandHandler {
  private _queryClient
  private _rejectRegistrationMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._rejectRegistrationMutation = useMutation({
      mutationFn: (body: { id: string; eventRegisterId: string; data: FormRejectRegistrationEventType }) =>
        studentAPI.rejectRegistration(body)
    })
  }

  handle = (
    body: { id: string; eventRegisterId: string; data: FormRejectRegistrationEventType },
    handleSuccess: any,
    handleError: any
  ) => {
    return this._rejectRegistrationMutation.mutate(body, {
      onSuccess: () => {
        this._queryClient.invalidateQueries({
          queryKey: ['registered_students']
        })
        handleSuccess()
      },
      onError: (error: any) => {
        handleError(error)
      }
    })
  }

  isLoading() {
    return this._rejectRegistrationMutation.isLoading
  }
}

export { RejectRegistrationCommandHandler }
