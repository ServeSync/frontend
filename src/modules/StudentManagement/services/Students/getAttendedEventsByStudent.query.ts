import { useQuery } from "@tanstack/react-query"
import studentAPI from "./student.api"
import { StudentAttendedEventsListType } from "src/modules/EventManagement/interfaces"

class GetAttendedEventsByStudent {
    private _query
  
    constructor(id: string, page: number) {
      this._query = useQuery({
        queryKey: ['student_attended_events', id, page],
        queryFn: () => studentAPI.getAttendedEvents(id, page),
        enabled: id !== undefined,
        staleTime: 3 * 60 * 1000
      })
    }

    static instance(id: string, page: number) {
      return new GetAttendedEventsByStudent(id, page)
    }
  
    fetch() {
      return this._query.data?.data as StudentAttendedEventsListType
    }
  
    isLoading() {
      return this._query.isLoading
    }
  }
  
  export { GetAttendedEventsByStudent }
  