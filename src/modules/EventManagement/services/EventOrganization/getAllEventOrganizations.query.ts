/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import { EventOrganizationsListType } from '../../interfaces'
import eventOrganizationAPI from './event_organization.api'
import useQueryOrganizationConfig from 'src/modules/EventOrganizationManagement/hooks/useQueryOrganizationConfig'
import { OrganizersListConfig } from 'src/modules/EventOrganizationManagement/interfaces/Organizer/organizer.config'

class GetAllEventOrganizationsQuery {
  private _query
  private _queryEventOrganizationConfig
  constructor() {
    this._queryEventOrganizationConfig = useQueryOrganizationConfig()
    this._query = useQuery({
      queryKey: ['event_organizations', this._queryEventOrganizationConfig],
      queryFn: () =>
        eventOrganizationAPI.getListEventOrganizations(this._queryEventOrganizationConfig as OrganizersListConfig),
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
