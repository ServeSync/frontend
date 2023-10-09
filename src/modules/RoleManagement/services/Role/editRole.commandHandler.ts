/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FormRoleType } from '../../utils/rules'
import roleAPI from './role.api'

class EditRoleCommandHandler {
  private queryClient
  private EditRoleMutation

  constructor() {
    this.queryClient = useQueryClient()
    this.EditRoleMutation = useMutation({
      mutationFn: (body: { id: string; data: FormRoleType }) => roleAPI.editRole(body)
    })
  }

  handle = (body: { id: string; data: FormRoleType }, handleSuccess: any, handleError: any) => {
    return this.EditRoleMutation.mutate(body, {
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
    return this.EditRoleMutation.isLoading
  }
}

export { EditRoleCommandHandler }
