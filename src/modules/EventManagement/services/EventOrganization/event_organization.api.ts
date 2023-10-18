import http from 'src/modules/Share/utils/http'
import { ContactsListType, EventOrganizationsListType } from '../../interfaces'

const eventOrganizationAPI = {
  getListEventOrganizations: () => http.get<EventOrganizationsListType>('/event-organizations'),

  getListContactsByOrganizationId: (id: string) => http.get<ContactsListType>(`/event-organizations/${id}/contacts`)
}

export default eventOrganizationAPI
