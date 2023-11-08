/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from '@tanstack/react-query'
import eventAPI from './event.api'
import { EventAttendance } from '../../interfaces'

class AttendanceEventCommandHandler {
  private _attendanceEventMutation

  constructor() {
    this._attendanceEventMutation = useMutation({
      mutationFn: (body: { id: string; data: EventAttendance }) => eventAPI.attendanceEvent(body)
    })
  }

  handle = (body: { id: string; data: EventAttendance }, handleSuccess: any, handleError: any) => {
    return this._attendanceEventMutation.mutate(body, {
      onSuccess: () => {
        handleSuccess()
      },
      onError: (error: any) => {
        handleError(error)
      }
    })
  }

  isLoading() {
    return this._attendanceEventMutation.isLoading
  }
}

export { AttendanceEventCommandHandler }
