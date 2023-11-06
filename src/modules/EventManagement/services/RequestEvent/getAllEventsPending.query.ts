/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import useQueryRequestEventConfig from '../../hooks/useQueryRequestEventConfig'
import { EventPendingType, EventsPendingListType, RequestEventsListConfig } from '../../interfaces'
import requestEventAPI from './request_event.api'

class GetAllEventsPendingQuery {
  private _query
  private _queryRequestEventConfig

  constructor(type?: EventPendingType) {
    this._queryRequestEventConfig = useQueryRequestEventConfig()
    this._query = useQuery({
      queryKey: ['pending_events', this._queryRequestEventConfig, type],
      queryFn: () => requestEventAPI.getListRequestEvents(this._queryRequestEventConfig as RequestEventsListConfig),
      keepPreviousData: true,
      staleTime: 3 * 60 * 1000
    })
  }

  fetch() {
    return this._query.data?.data as EventsPendingListType
  }

  getTotalPages() {
    return this._query.data?.data.totalPages as number
  }

  isLoading() {
    return this._query.isLoading
  }
}

export { GetAllEventsPendingQuery }
