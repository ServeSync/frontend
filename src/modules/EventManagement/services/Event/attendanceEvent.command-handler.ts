/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import eventAPI from './event.api'
import { EventAttendance } from '../../interfaces'

class AttendanceEventCommandHandler {
  handle = (body: { id: string; data: EventAttendance }, handleSuccess: any, handleError: any) => {
    eventAPI
      .attendanceEvent(body)
      .then((res) => handleSuccess(res))
      .catch((error) => handleError(error.response.data))
  }
}

export { AttendanceEventCommandHandler }
