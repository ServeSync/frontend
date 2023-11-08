/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import eventAPI from './event.api'

class CancelEventCommandHandler {
  private _queryClient
  private _cancelEventMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._cancelEventMutation = useMutation({
      mutationFn: (id: string) => eventAPI.cancelEvent(id)
    })
  }

  handle = (id: string, handleSuccess: any, handleError: any) => {
    return this._cancelEventMutation.mutate(id, {
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
    return this._cancelEventMutation.isLoading
  }
}

export { CancelEventCommandHandler }
