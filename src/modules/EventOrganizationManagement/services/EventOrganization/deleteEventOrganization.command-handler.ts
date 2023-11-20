/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import eventOrganizationAPI from './event_organization.api'

class DeleteEventOrganizationCommandHandler {
  private _queryClient
  private _deleteEventOrganizationMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._deleteEventOrganizationMutation = useMutation({
      mutationFn: (id: string) => eventOrganizationAPI.deleteEventOrganization(id)
    })
  }

  handle = (id: string, handleSuccess: any, handleError: any) => {
    return this._deleteEventOrganizationMutation.mutate(id, {
      onSuccess: () => {
        this._queryClient.invalidateQueries({
          queryKey: ['event_organizations']
        })
        handleSuccess()
      },
      onError: (error: any) => {
        handleError(error)
      }
    })
  }
}

export { DeleteEventOrganizationCommandHandler }
