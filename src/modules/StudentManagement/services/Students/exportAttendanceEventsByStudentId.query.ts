/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import studentAPI from './student.api'

class ExportAttendanceEventsByStudentIdQuery {
  private _query

  constructor(id: string) {
    this._query = useQuery({
      queryKey: ['attended_events_export', id],
      queryFn: () => studentAPI.exportAttendanceEvents(id),
      enabled: id !== undefined
    })
  }

  fetch() {
    return this._query.data?.data
  }

  isLoading() {
    return this._query.isLoading
  }
}

export { ExportAttendanceEventsByStudentIdQuery }
