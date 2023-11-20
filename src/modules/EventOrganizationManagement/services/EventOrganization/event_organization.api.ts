import http from 'src/modules/Share/utils/http'

import { EventOrganizationConfig } from '../../interfaces/EventOrganization/event_organization.config'
import { FormEventOrganizationType } from 'src/modules/EventOrganizationManagement/utils'
import { ContactsListType, EventOrganizationType, EventOrganizationsListType } from '../../interfaces'

const eventOrganizationAPI = {
  getListEventOrganizations: (params: EventOrganizationConfig) =>
    http.get<EventOrganizationsListType>('/event-organizations', { params }),

  getEventOrganizationById: (id: string) => http.get<EventOrganizationType>(`/event-organizations/${id}`),

  getListContactsByOrganizationId: (id: string) => http.get<ContactsListType>(`/event-organizations/${id}/contacts`),

  createEventOrganization: (body: FormEventOrganizationType) =>
    http.post<EventOrganizationType>('/event-organizations', body),

  editEventOrganization: (body: { id: string; data: FormEventOrganizationType }) =>
    http.put(`/event-organizations/${body.id}`, body.data),

  deleteEventOrganization: (id: string) => http.delete(`/event-organizations/${id}`)
}

export default eventOrganizationAPI
