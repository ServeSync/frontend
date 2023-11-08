/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import eventAPI from './event.api'

class ApproveEventCommandHandler {
  private _queryClient
  private _approveEventMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._approveEventMutation = useMutation({
      mutationFn: (id: string) => eventAPI.approveEvent(id)
    })
  }

  handle = (id: string, handleSuccess: any, handleError: any) => {
    return this._approveEventMutation.mutate(id, {
      onSuccess: () => {
        this._queryClient.invalidateQueries({
          queryKey: ['events']
        })
        handleSuccess()
      },
      onError: (error: any) => {
        handleError(error)
      }
    })
  }

  isLoading() {
    return this._approveEventMutation.isLoading
  }
}

export { ApproveEventCommandHandler }
