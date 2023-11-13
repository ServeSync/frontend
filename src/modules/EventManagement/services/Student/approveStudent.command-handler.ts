/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import studentAPI from './student.api'

class ApproveStudentCommandHandler {
  private _queryClient
  private _approveStudentMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._approveStudentMutation = useMutation({
      mutationFn: (body: { id: string; eventRegisterId: string }) =>
        studentAPI.approveStudent(body.id, body.eventRegisterId)
    })
  }

  handle = (body: { id: string; eventRegisterId: string }, handleSuccess: any, handleError: any) => {
    return this._approveStudentMutation.mutate(body, {
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
    return this._approveStudentMutation.isLoading
  }
}

export { ApproveStudentCommandHandler }
