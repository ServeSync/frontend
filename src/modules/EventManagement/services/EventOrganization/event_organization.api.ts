import http from 'src/modules/Share/utils/http'
import {
  ContactsListType,
  EventOrganizationForm,
  EventOrganizationType,
  EventOrganizationsListType
} from '../../interfaces'
import { EventOrganizationConfig } from '../../interfaces/EventOrganization/event_organization.config'

const eventOrganizationAPI = {
  getListEventOrganizations: (params: EventOrganizationConfig) =>
    http.get<EventOrganizationsListType>('/event-organizations', { params }),

  getEventOrganizationById: (id: string) => http.get<EventOrganizationType>(`/event-organizations/${id}`),

  getListContactsByOrganizationId: (id: string) => http.get<ContactsListType>(`/event-organizations/${id}/contacts`),

  editEventOrganization: (body: { id: string; data: EventOrganizationForm }) =>
    http.put(`/event-organizations/${body.id}`, body.data),

  deleteEventOrganization: (id: string) => http.delete(`/event-organizations/${id}`)
}

export default eventOrganizationAPI
