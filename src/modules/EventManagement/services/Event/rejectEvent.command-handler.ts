/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import eventAPI from './event.api'

class RejectEventCommandHandler {
  private _queryClient
  private _rejectEventMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._rejectEventMutation = useMutation({
      mutationFn: (id: string) => eventAPI.rejectEvent(id)
    })
  }

  handle = (id: string, handleSuccess: any, handleError: any) => {
    return this._rejectEventMutation.mutate(id, {
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
    return this._rejectEventMutation.isLoading
  }
}

export { RejectEventCommandHandler }
