/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FormRoleType } from '../../utils/rules/role.rules'
import roleAPI from './role.api'

class CreateRoleCommandHandler {
  private _queryClient
  private _createRoleMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._createRoleMutation = useMutation({
      mutationFn: (body: FormRoleType) => roleAPI.createRole(body)
    })
  }

  handle = (role: FormRoleType, handleSuccess: any, handleError: any) => {
    return this._createRoleMutation.mutate(role, {
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
    return this._createRoleMutation.isLoading
  }
}

export { CreateRoleCommandHandler }
