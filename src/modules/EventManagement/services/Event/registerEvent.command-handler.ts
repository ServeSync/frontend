/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from '@tanstack/react-query'
import eventAPI from './event.api'
import { RegisteredEventType } from '../../interfaces'

class RegisterEventCommandHandler {
  private _registerEventMutation

  constructor() {
    this._registerEventMutation = useMutation({
      mutationFn: (body: RegisteredEventType) => eventAPI.registerEvent(body)
    })
  }

  handle = (body: RegisteredEventType, handleSuccess: any, handleError: any) => {
    return this._registerEventMutation.mutate(body, {
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
