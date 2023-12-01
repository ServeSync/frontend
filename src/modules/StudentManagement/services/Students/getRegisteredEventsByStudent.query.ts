/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import studentAPI from './student.api'
import { StudentRegisteredEventsListType } from 'src/modules/EventManagement/interfaces'

class GetRegisteredEventsByStudent {
  private _query

  constructor(id: string) {
    this._query = useQuery({
      queryKey: ['student_registered_events', id],
      queryFn: () => studentAPI.getRegisteredEvents(id),
      enabled: id !== undefined,
      staleTime: 3 * 60 * 1000
    })
  }

  static instance(id: string) {
    return new GetRegisteredEventsByStudent(id)
  }

  fetch() {
    return this._query.data?.data as StudentRegisteredEventsListType
  }

  isLoading() {
    return this._query.isLoading
  }
}

export { GetRegisteredEventsByStudent }
