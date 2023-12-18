/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import collaborationRequestAPI from './collaboration_request.api'

class ApproveRequestEvent {
  private _queryClient
  private _approveRequestEventMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._approveRequestEventMutation = useMutation({
      mutationFn: (id: string) => collaborationRequestAPI.approveRequestEvent(id)
    })
  }

  handle = (id: string, handleSuccess: any, handleError: any) => {
    return this._approveRequestEventMutation.mutate(id, {
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

export { ApproveRequestEvent }
