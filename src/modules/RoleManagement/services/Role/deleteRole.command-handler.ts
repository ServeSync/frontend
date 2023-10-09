/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import roleAPI from './role.api'

class DeleteRoleCommandHandler {
  private _queryClient
  private _deleteRoleMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._deleteRoleMutation = useMutation({
      mutationFn: (id: string) => roleAPI.deleteRole(id)
    })
  }

  handle = (id: string, handleSuccess: any, handleError: any) => {
    return this._deleteRoleMutation.mutate(id, {
      onSuccess: () => {
        this._queryClient.invalidateQueries({
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
