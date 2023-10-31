/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import { EventOrganizationsListType } from '../../interfaces'
import eventOrganizationAPI from './event_organization.api'

class GetAllEventOrganizationsQuery {
  private _query

  constructor() {
    this._query = useQuery({
      queryKey: ['event_organizations'],
      queryFn: () => eventOrganizationAPI.getListEventOrganizations(),
      keepPreviousData: true,
      staleTime: 3 * 60 * 1000
    })
  }

  fetch() {
    return this._query.data?.data as EventOrganizationsListType
  }
}

export { GetAllEventOrganizationsQuery }
