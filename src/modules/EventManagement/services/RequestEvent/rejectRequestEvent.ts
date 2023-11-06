/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import requestEventAPI from './request_event.api'

class RejectRequestEvent {
  private _queryClient
  private _rejectRequestEventMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._rejectRequestEventMutation = useMutation({
      mutationFn: (id: string) => requestEventAPI.rejectRequestEvent(id)
    })
  }

  handle = (id: string, handleSuccess: any, handleError: any) => {
    return this._rejectRequestEventMutation.mutate(id, {
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

export { RejectRequestEvent }
