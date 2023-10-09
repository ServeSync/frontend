/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FormRoleType } from '../../utils/rules'
import roleAPI from './role.api'

class CreateRoleCommandHandler {
  private queryClient
  private CreateRoleMutation

  constructor() {
    this.queryClient = useQueryClient()
    this.CreateRoleMutation = useMutation({
      mutationFn: (body: FormRoleType) => roleAPI.createRole(body)
    })
  }

  handle = (role: FormRoleType, handleSuccess: any, handleError: any) => {
    return this.CreateRoleMutation.mutate(role, {
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

  isLoading() {
    return this.CreateRoleMutation.isLoading
  }
}

export { CreateRoleCommandHandler }
