/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import studentAPI from './student.api'

class DeleteStudentCommandHandler {
  private _queryClient
  private _deleteStudentMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._deleteStudentMutation = useMutation({
      mutationFn: (id: string) => studentAPI.deleteStudent(id)
    })
  }

  handle = (id: string, handleSuccess: any, handleError: any) => {
    return this._deleteStudentMutation.mutate(id, {
      onSuccess: () => {
        this._queryClient.invalidateQueries({
          queryKey: ['students']
        })
        handleSuccess()
      },
      onError: (error: any) => {
        handleError(error)
      }
    })
  }
}

export { DeleteStudentCommandHandler }
