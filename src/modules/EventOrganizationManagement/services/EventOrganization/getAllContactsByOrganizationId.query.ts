/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import eventOrganizationAPI from './event_organization.api'
import { ContactsListType } from '../../interfaces'

class GetAllContactsByOrganizationIdQuery {
  private _query

  constructor(organizationId: string) {
    this._query = useQuery({
      queryKey: ['contacts', organizationId],
      queryFn: () => eventOrganizationAPI.getListContactsByOrganizationId(organizationId),
      enabled: organizationId !== '' && organizationId !== undefined,
      staleTime: 3 * 60 * 1000
    })
  }

  fetch() {
    return this._query.data?.data as ContactsListType
  }
}

export { GetAllContactsByOrganizationIdQuery }