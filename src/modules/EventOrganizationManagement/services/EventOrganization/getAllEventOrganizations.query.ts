/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import eventOrganizationAPI from './event_organization.api'
import useQueryOrganizationConfig from 'src/modules/EventOrganizationManagement/hooks/useQueryOrganizationConfig'
import { EventOrganizationConfig, EventOrganizationsListType } from '../../interfaces'

class GetAllEventOrganizationsQuery {
  private _query
  private _queryEventOrganizationConfig

  constructor() {
    this._queryEventOrganizationConfig = useQueryOrganizationConfig()
    this._query = useQuery({
      queryKey: ['event_organizations', this._queryEventOrganizationConfig],
      queryFn: () =>
        eventOrganizationAPI.getListEventOrganizations(this._queryEventOrganizationConfig as EventOrganizationConfig),
      keepPreviousData: true,
      staleTime: 3 * 60 * 1000
    })
  }

  fetch() {
    return this._query.data?.data as EventOrganizationsListType
  }

  getTotalPages() {
    return this._query.data?.data.totalPages as number
  }

  isLoading() {
    return this._query.isLoading
  }
}

export { GetAllEventOrganizationsQuery }
