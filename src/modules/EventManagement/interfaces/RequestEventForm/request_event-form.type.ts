import { eventOrganizationContactInfo, eventOrganizationInfo } from '.'
import { Address } from '..'

export interface requestEventForm {
  name?: string
  introduction?: string
  description?: string
  capacity?: string
  imageUrl?: string
  startAt?: string
  endAt?: string
  eventType?: string
  activityId?: string
  address?: Address
  eventOrganizationInfo?: eventOrganizationInfo
  eventOrganizationContactInfo?: eventOrganizationContactInfo
}
