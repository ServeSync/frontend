import { Address, EventOrganizationFormType, EventRole, RepresentativeOrganization } from '..'

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

export interface EventsListType {
  total: number
  totalPages: number
  data: EventType[]
}

export interface EventsPendingListType {
  total: number
  totalPages: number
  data: EventPendingType[]
}

export interface EventPendingType {
  id: string
  name: string
  introduction: string
  capacity: number
  imageUrl: string
  startAt: string
  endAt: string
  status: string
  type: string
  address: Address
  description: string
  organization: {
    name: string
    description: string
    email: string
    phoneNumber: string
    address: string
    imageUrl: string
  }
  organizationContact: {
    name: string
    email: string
    phoneNumber: string
    gender: boolean
    address: string
    birth: string
    position: string
    imageUrl: string
  }
  activity: {
    id: string
    name: string
  }
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
  id: string
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
      id?: string
      isRegistered?: boolean
      registered?: string
      approvedRegistered?: string
      name: string
      description: string
      isNeedApprove: string
      score: string
      quantity: string
    }
  ]
  organizations: [
    {
      id: string
      name: string
      email: string
      phoneNumber: string
      address: string
      imageUrl: string
      organizationId: string
      role: string
      representatives: [
        {
          id: string
          name: string
          imageUrl: string
          email: string
          phoneNumber: string
          position: string
          address: string
          role: string
          organizationRepId: string
        }
      ]
    }
  ]
  registrationInfos: [
    {
      id: string
      startAt: string
      endAt: string
      status: string
    }
  ]
  attendanceInfos: [
    {
      id: string
      code: string
      qrCodeUrl: string
      startAt: string
      endAt: string
      status: string
    }
  ]
  capacity: string
  registered: string
  attended: string
  rating: number
  approvedRegistered: string
  activity: {
    id: string
    name: string
  }
  representativeOrganization: {
    id: string
    name: string
    email: string
    address: string
    phoneNumber: string
    imageUrl: string
    organizationId: string
  }
}
