/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import studentAPI from './student.api'

class DeleteStudentCommandHandler {
  private queryClient
  private DeleteStudentMutation

  constructor() {
    this.queryClient = useQueryClient()
    this.DeleteStudentMutation = useMutation({
      mutationFn: (id: string) => studentAPI.deleteStudent(id)
    })
  }

  handle = async (id: string, handleSuccess: any) => {
    return this.DeleteStudentMutation.mutate(id, {
      onSuccess: () => {
        this.queryClient.invalidateQueries({
          queryKey: ['students']
        })
        handleSuccess()
      }
    })
  }
}

export { DeleteStudentCommandHandler }
