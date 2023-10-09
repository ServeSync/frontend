/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import roleAPI from './role.api'

class EditPermissionsByRoleIdCommandHandler {
  private _queryClient
  private _editPermissionsByRoleIdMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._editPermissionsByRoleIdMutation = useMutation({
      mutationFn: (body: { id: string; data: string[] }) => roleAPI.editPermissionsByRoleId(body)
    })
  }

  handle = (body: { id: string; data: string[] }, handleSuccess: any, handleError: any) => {
    return this._editPermissionsByRoleIdMutation.mutate(body, {
      onSuccess: () => {
        this._queryClient.invalidateQueries({
          queryKey: ['permissions']
        })
        handleSuccess()
      },
      onError: (error: any) => {
        handleError(error)
      }
    })
  }

  isLoading() {
    return this._editPermissionsByRoleIdMutation.isLoading
  }
}

export { EditPermissionsByRoleIdCommandHandler }
