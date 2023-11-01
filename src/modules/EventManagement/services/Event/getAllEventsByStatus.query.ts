/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import eventAPI from './event.api'
import { EventsListType } from '../../interfaces'

class GetAllEventsByStatusQuery {
  private _query

  constructor(eventStatus: string, size?: number) {
    this._query = useQuery({
      queryKey: ['events', eventStatus, size],
      queryFn: () => eventAPI.getListEventsByStatus(eventStatus, size),
      keepPreviousData: true,
      staleTime: 3 * 60 * 1000
    })
  }
  fetch() {
    return this._query.data?.data as EventsListType
  }
}

export { GetAllEventsByStatusQuery }
