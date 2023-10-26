/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import useQueryEventConfig from '../../hooks/useQueryEventConfig'
import eventAPI from './event.api'
import { EventsListConfig, EventsListType } from '../../interfaces'

class GetAllEventsQuery {
  private _query
  private _queryEventConfig

  constructor(eventStatus?: EventsListType) {
    this._queryEventConfig = useQueryEventConfig()
    this._query = useQuery({
      queryKey: ['events', this._queryEventConfig, eventStatus],
      queryFn: () => eventAPI.getListEvents(this._queryEventConfig as EventsListConfig),
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000
    })
  }

  fetch() {
    return this._query.data?.data as EventsListType
  }

  getTotalPages() {
    return this._query.data?.data.totalPages as number
  }

  isLoading() {
    return this._query.isLoading
  }
}

export { GetAllEventsQuery }
