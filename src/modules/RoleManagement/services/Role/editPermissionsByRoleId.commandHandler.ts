/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import roleAPI from './role.api'

class EditPermissionsByRoleIdCommandHandler {
  private queryClient
  private EditPermissionsOfRoleMutation

  constructor() {
    this.queryClient = useQueryClient()
    this.EditPermissionsOfRoleMutation = useMutation({
      mutationFn: (body: { id: string; data: string[] }) => roleAPI.editPermissionsByRoleId(body)
    })
  }

  handle = (body: { id: string; data: string[] }, handleSuccess: any, handleError: any) => {
    return this.EditPermissionsOfRoleMutation.mutate(body, {
      onSuccess: () => {
        this.queryClient.invalidateQueries({
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
    return this.EditPermissionsOfRoleMutation.isLoading
  }
}

export { EditPermissionsByRoleIdCommandHandler }
