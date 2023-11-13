/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import eventAPI from './event.api'
import { handleError } from 'src/modules/Share/utils'
import { AttendanceStudentsListType } from '../../interfaces'

class GetAttendanceStudentsQuery {
  private _query

  constructor(id: string) {
    this._query = useQuery({
      queryKey: ['attendance_students', id],
      queryFn: () => eventAPI.getAttendanceStudents(id),
      enabled: id !== undefined,
      staleTime: 3 * 60 * 1000,
      onError: (error: any) => {
        handleError(error)
      }
    })
  }

  fetch() {
    return this._query.data?.data as AttendanceStudentsListType
  }
}

export { GetAttendanceStudentsQuery }
