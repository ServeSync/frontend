/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import requestEventAPI from './request_event.api'

class ApproveRequestEvent {
  private _queryClient
  private _approveRequestEventMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._approveRequestEventMutation = useMutation({
      mutationFn: (id: string) => requestEventAPI.approveRequestEvent(id)
    })
  }

  handle = (id: string, handleSuccess: any, handleError: any) => {
    return this._approveRequestEventMutation.mutate(id, {
      onSuccess: () => {
        this._queryClient.invalidateQueries({
          queryKey: ['pending_events']
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
