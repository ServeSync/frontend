import http from 'src/modules/Share/utils/http'
import { ContactsListType, EventOrganizationsListType } from '../../interfaces'
import { EventOrganizationConfig } from '../../interfaces/EventOrganization/event_organization.config'

const eventOrganizationAPI = {
  getListEventOrganizations: (params: EventOrganizationConfig) =>
    http.get<EventOrganizationsListType>('/event-organizations', { params }),

  getListContactsByOrganizationId: (id: string) => http.get<ContactsListType>(`/event-organizations/${id}/contacts`)
}

export default eventOrganizationAPI
