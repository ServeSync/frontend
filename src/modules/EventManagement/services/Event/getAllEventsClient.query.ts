/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import eventAPI from './event.api'
import { EventsListConfig, EventsListType } from '../../interfaces'
import useQueryEventClientConfig from '../../hooks/useQueryEventClientConfig'

class GetAllEventsClientQuery {
  private _query
  private _queryEventConfig

  constructor() {
    this._queryEventConfig = useQueryEventClientConfig()
    this._query = useQuery({
      queryKey: ['events', this._queryEventConfig],
      queryFn: () => eventAPI.getListEvents(this._queryEventConfig as EventsListConfig),
      keepPreviousData: true,
      staleTime: 3 * 60 * 1000
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

export { GetAllEventsClientQuery }
