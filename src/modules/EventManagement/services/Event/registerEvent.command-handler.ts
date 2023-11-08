/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from '@tanstack/react-query'
import eventAPI from './event.api'

class RegisterEventCommandHandler {
  private _registerEventMutation

  constructor() {
    this._registerEventMutation = useMutation({
      mutationFn: (id: string) => eventAPI.cancelEvent(id)
    })
  }

  handle = (id: string, handleSuccess: any, handleError: any) => {
    return this._registerEventMutation.mutate(id, {
      onSuccess: () => {
        handleSuccess()
      },
      onError: (error: any) => {
        handleError(error)
      }
    })
  }

  isLoading() {
    return this._registerEventMutation.isLoading
  }
}

export { RegisterEventCommandHandler }
