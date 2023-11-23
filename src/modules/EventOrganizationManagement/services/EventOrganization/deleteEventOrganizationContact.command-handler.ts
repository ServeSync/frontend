/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import eventOrganizationAPI from './event_organization.api'

class DeleteEventOrganizationContactCommandHandler {
  private _queryClient
  private _deleteEventOrganizationContactMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._deleteEventOrganizationContactMutation = useMutation({
      mutationFn: (body: { id: string; idContact: string }) => eventOrganizationAPI.deleteEventOrganizationContact(body)
    })
  }

  handle = (id: string, idContact: string, handleSuccess: any, handleError: any) => {
    return this._deleteEventOrganizationContactMutation.mutate(
      {
        id: id,
        idContact: idContact
      },
      {
        onSuccess: () => {
          this._queryClient.invalidateQueries({
            queryKey: ['event_organization']
          })
          this._queryClient.invalidateQueries({
            queryKey: ['event_organizations']
          })
          handleSuccess()
        },
        onError: (error: any) => {
          handleError(error)
        }
      }
    )
  }
}

export { DeleteEventOrganizationContactCommandHandler }
