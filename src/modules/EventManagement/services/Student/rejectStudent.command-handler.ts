/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import studentAPI from './student.api'

class RejectStudentCommandHandler {
  private _queryClient
  private _rejectStudentMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._rejectStudentMutation = useMutation({
      mutationFn: (body: { id: string; eventRegisterId: string; rejectReason: string }) =>
        studentAPI.rejectStudent(body.id, body.eventRegisterId, body.rejectReason)
    })
  }

  handle = (
    body: { id: string; eventRegisterId: string; rejectReason: string },
    handleSuccess: any,
    handleError: any
  ) => {
    return this._rejectStudentMutation.mutate(body, {
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
    return this._rejectStudentMutation.isLoading
  }
}

export { RejectStudentCommandHandler }
