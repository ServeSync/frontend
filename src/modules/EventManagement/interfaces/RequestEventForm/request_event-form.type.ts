import { EventOrganizationContactInfo, EventOrganizationInfo } from '.'
import { Address } from '..'

export interface RequestEventForm {
  name: string
  introduction: string
  description: string
  capacity: string
  imageUrl?: string
  startAt: string
  endAt: string
  eventType: string
  activityId: string
  address: Address
  EventOrganizationInfo: EventOrganizationInfo
  EventOrganizationContactInfo: EventOrganizationContactInfo
}
