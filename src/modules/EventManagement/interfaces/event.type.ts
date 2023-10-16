import { Address, RepresentativeOrganization } from '.'

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
