/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FormRoleType } from '../../utils/rules'
import roleAPI from './role.api'

class EditRoleCommandHandler {
  private _queryClient
  private _editRoleMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._editRoleMutation = useMutation({
      mutationFn: (body: { id: string; data: FormRoleType }) => roleAPI.editRole(body)
    })
  }

  handle = (body: { id: string; data: FormRoleType }, handleSuccess: any, handleError: any) => {
    return this._editRoleMutation.mutate(body, {
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

  isLoading() {
    return this._editRoleMutation.isLoading
  }
}

export { EditRoleCommandHandler }
