import { EventOrganizationContactInformation, EventOrganizationInformation } from '.'

export interface RequestEventForm {
  name: string
  introduction: string
  description: string
  capacity: string
  imageUrl: string
  startAt: string
  endAt: string
  eventType: string
  activityId: string
  address: {
    fullAddress: string
    longitude: string
    latitude: string
  }
  EventOrganizationInfo: EventOrganizationInformation
  EventOrganizationContactInfo: EventOrganizationContactInformation
}
