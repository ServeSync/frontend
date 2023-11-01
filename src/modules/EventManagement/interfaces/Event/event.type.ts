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

export interface EventDetailType {
  name: string
  introduction: string
  imageUrl: string
  startAt: string
  endAt: string
  type: string
  status: string
  calculatedStatus: string
  address: {
    fullAddress: string
    longitude: number
    latitude: number
  }
  description: string
  isRegistered: boolean
  isAttendance: boolean
  roles: [
    {
      isRegistered: boolean
      registered: string
      id: string
      name: string
      description: string
      isNeedApprove: boolean
      score: string
      quantity: string
    }
  ]
  organizations: [
    {
      role: string
      representatives: [
        {
          id: string
          name: string
          imageUrl: string
          email: string
          phoneNumber: string
          position: string
          role: string
          organizationRepId: string
        }
      ]
      id: string
      name: string
      email: string
      phoneNumber: string
      imageUrl: string
      organizationId: string
    }
  ]
  registrationInfos: [
    {
      id: string
      startAt: string
      endAt: string
    }
  ]
  attendanceInfos: [
    {
      id: string
      code: string
      qrCodeUrl: string
      startAt: string
      endAt: string
    }
  ]
  capacity: string
  registered: string
  rating: number
  activity: {
    id: string
    name: string
  }
  representativeOrganization: {
    id: string
    name: string
    email: string
    phoneNumber: string
    imageUrl: string
    organizationId: string
  }
}
