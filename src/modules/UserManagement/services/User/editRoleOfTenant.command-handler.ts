/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from '@tanstack/react-query'
import userAPI from './user.api'

class EditRoleOfTenantCommandHandler {
  private _editRoleOfTenantMutation

  constructor() {
    this._editRoleOfTenantMutation = useMutation({
      mutationFn: (body: { id: string; tenantId: string; data: string[] }) => userAPI.editRolesOfTenant(body)
    })
  }

  handle = (body: { id: string; tenantId: string; data: string[] }, handleSuccess: any, handleError: any) => {
    return this._editRoleOfTenantMutation.mutate(body, {
      onSuccess: () => {
        handleSuccess()
      },
      onError: (error: any) => {
        handleError(error)
      }
    })
  }
}

export { EditRoleOfTenantCommandHandler }
