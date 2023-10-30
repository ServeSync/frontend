import { Address, EventOrganizationFormType, EventRole, RepresentativeOrganization } from '..'

export interface EventsListType {
  total: number
  totalPages: number
  data: EventType[]
}

export interface EventType {
  id: string
  name: string
  introduction: string
  capacity: number
  registered: number
  rating: number
  imageUrl: string
  startAt: string
  endAt: string
  type: string
  status: string
  representativeOrganization: RepresentativeOrganization
  address: Address
}

export interface EventsListConfig {
  startDate?: string
  endDate?: string
  eventType?: string
  eventStatus?: string
  id?: string
  search?: string
  sorting?: string
  page?: number
  size?: number
}

export interface FormEvent {
  name: string
  introduction: string
  imageUrl?: string | undefined
  startAt: string
  endAt: string
  type: string
  activityId: string
  address: {
    fullAddress: string
    longitude: string
    latitude: string
  }
  description: string
  registrationInfos: {
    startAt: string
    endAt: string
  }[]
  attendanceInfos: {
    startAt: string
    endAt: string
  }[]
  roles: EventRole[]
  organizations: EventOrganizationFormType[]
  representativeOrganizationId: string
}
