import http from 'src/modules/Share/utils/http'

import { EventOrganizationConfig } from '../../interfaces/EventOrganization/event_organization.config'
import {
  FormEventOrganizationContactType,
  FormEventOrganizationType
} from 'src/modules/EventOrganizationManagement/utils'
import { ContactsListType, EventOrganizationType, EventOrganizationsListType } from '../../interfaces'

const eventOrganizationAPI = {
  getListEventOrganizations: (params: EventOrganizationConfig, status?: string) =>
    http.get<EventOrganizationsListType>('/event-organizations', { params: { ...params, status } }),

  getEventOrganizationById: (id: string) => http.get<EventOrganizationType>(`/event-organizations/${id}`),

  getListContactsByOrganizationId: (id: string, status?: string) =>
    http.get<ContactsListType>(`/event-organizations/${id}/contacts`, { params: { status } }),

  createEventOrganization: (body: FormEventOrganizationType) =>
    http.post<EventOrganizationType>('/event-organizations', body),

  editEventOrganization: (body: { id: string; data: FormEventOrganizationType }) =>
    http.put(`/event-organizations/${body.id}`, body.data),

  deleteEventOrganization: (id: string) => http.delete(`/event-organizations/${id}`),

  createEventOrganizationContact: (body: { id: string; data: FormEventOrganizationContactType }) =>
    http.post(`/event-organizations/${body.id}/contacts`, body.data),

  editEventOrganizationContact: (body: { id: string; idContact: string; data: FormEventOrganizationContactType }) =>
    http.put(`/event-organizations/${body.id}/contacts/${body.idContact}`, body.data),

  deleteEventOrganizationContact: (body: { id: string; idContact: string }) =>
    http.delete(`/event-organizations/${body.id}/contacts/${body.idContact}`)
}

export default eventOrganizationAPI
