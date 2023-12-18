/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import collaborationRequestAPI from './collaboration_request.api'

class RejectRequestEvent {
  private _queryClient
  private _rejectRequestEventMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._rejectRequestEventMutation = useMutation({
      mutationFn: (id: string) => collaborationRequestAPI.rejectRequestEvent(id)
    })
  }

  handle = (id: string, handleSuccess: any, handleError: any) => {
    return this._rejectRequestEventMutation.mutate(id, {
      onSuccess: () => {
        this._queryClient.invalidateQueries({
          queryKey: ['collaboration_requests']
        })
        handleSuccess()
      },
      onError: (error: any) => {
        handleError(error)
      }
    })
  }
}

export { RejectRequestEvent }
