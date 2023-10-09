/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import studentAPI from './student.api'

class ImportFileCommandHandler {
  private queryClient
  private ImportFileMutation

  constructor() {
    this.queryClient = useQueryClient()
    this.ImportFileMutation = useMutation(studentAPI.importFileStudents)
  }

  handle = (file: File, handleSuccess: any, handleError: any) => {
    const form = new FormData()
    form.append('file', file)

    return this.ImportFileMutation.mutate(form, {
      onSuccess: () => {
        this.queryClient.invalidateQueries({
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
