/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import studentAPI from './student.api'

class ImportFileCommandHandler {
  private _queryClient
  private _importFileMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._importFileMutation = useMutation(studentAPI.importFileStudents)
  }

  handle = (file: File, handleSuccess: any, handleError: any) => {
    const form = new FormData()
    form.append('file', file)

    return this._importFileMutation.mutate(form, {
      onSuccess: () => {
        this._queryClient.invalidateQueries({
          queryKey: ['students']
        })
        handleSuccess()
      },
      onError: () => {
        handleError()
      }
    })
  }
}

export { ImportFileCommandHandler }
