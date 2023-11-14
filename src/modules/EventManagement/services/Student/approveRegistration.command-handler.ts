/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import studentAPI from './student.api'

class ApproveRegistrationCommandHandler {
  private _queryClient
  private _approveRegistrationMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._approveRegistrationMutation = useMutation({
      mutationFn: (body: { id: string; eventRegisterId: string }) =>
        studentAPI.approveRegistration(body.id, body.eventRegisterId)
    })
  }

  handle = (body: { id: string; eventRegisterId: string }, handleSuccess: any, handleError: any) => {
    return this._approveRegistrationMutation.mutate(body, {
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
    return this._approveRegistrationMutation.isLoading
  }
}

export { ApproveRegistrationCommandHandler }
