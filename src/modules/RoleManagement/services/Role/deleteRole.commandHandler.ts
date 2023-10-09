/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import roleAPI from './role.api'

class DeleteRoleCommandHandler {
  private queryClient
  private DeleteRoleMutation

  constructor() {
    this.queryClient = useQueryClient()
    this.DeleteRoleMutation = useMutation({
      mutationFn: (id: string) => roleAPI.deleteRole(id)
    })
  }

  handle = (id: string, handleSuccess: any, handleError: any) => {
    return this.DeleteRoleMutation.mutate(id, {
      onSuccess: () => {
        this.queryClient.invalidateQueries({
          queryKey: ['roles']
        })
        handleSuccess()
      },
      onError: (error: any) => {
        handleError(error)
      }
    })
  }
}

export { DeleteRoleCommandHandler }
