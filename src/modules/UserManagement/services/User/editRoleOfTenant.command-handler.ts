/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import userAPI from './user.api'

class EditRoleOfTenantCommandHandler {
  private _queryClient
  private _editRoleOfTenantMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._editRoleOfTenantMutation = useMutation({
      mutationFn: (body: { id: string; tenantId: string; data: string[] }) => userAPI.editRolesOfTenant(body)
    })
  }

  handle = (body: { id: string; tenantId: string; data: string[] }, handleSuccess: any, handleError: any) => {
    return this._editRoleOfTenantMutation.mutate(body, {
      onSuccess: () => {
        this._queryClient.invalidateQueries({
          queryKey: ['rolesOfTenant']
        })
        handleSuccess()
      },
      onError: (error: any) => {
        handleError(error)
      }
    })
  }

  isLoading() {
    return this._editRoleOfTenantMutation.isLoading
  }
}

export { EditRoleOfTenantCommandHandler }
