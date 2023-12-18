/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import useQueryRequestEventConfig from '../../hooks/useQueryRequestEventConfig'
import collaborationRequestAPI from './collaboration_request.api'
import { CollaborationRequestType, CollaborationRequestsListType, RequestEventsListConfig } from '../../interfaces'

class GetAllCollaborationRequestsQuery {
  private _query
  private _queryRequestEventConfig

  constructor(type?: CollaborationRequestType) {
    this._queryRequestEventConfig = useQueryRequestEventConfig()
    this._query = useQuery({
      queryKey: ['collaboration_requests', this._queryRequestEventConfig, type],
      queryFn: () =>
        collaborationRequestAPI.getListRequestEvents(this._queryRequestEventConfig as RequestEventsListConfig),
      keepPreviousData: true,
      staleTime: 3 * 60 * 1000
    })
  }

  fetch() {
    return this._query.data?.data as CollaborationRequestsListType
  }

  getTotalPages() {
    return this._query.data?.data.totalPages as number
  }

  isLoading() {
    return this._query.isLoading
  }
}

export { GetAllCollaborationRequestsQuery }
