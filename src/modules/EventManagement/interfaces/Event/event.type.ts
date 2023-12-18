import { ContactType, RepresentativeType } from 'src/modules/EventOrganizationManagement/interfaces'
import { Activity, Address, EventOrganizationFormType, EventRole, RepresentativeOrganization } from '..'

export interface EventType {
  capacity: number
  attended: number
  registered: number
  approvedRegistered: number
  rating: number
  activity: Activity
  id: string
  name: string
  introduction: string
  imageUrl: string
  startAt: string
  endAt: string
  type: string
  status: string
  calculatedStatus: string
  representativeOrganization: RepresentativeOrganization
  address: Address
}

export interface EventsListType {
  total: number
  totalPages: number
  data: EventType[]
}

export interface FormEvent {
  name: string
  introduction: string
  imageUrl: string
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
    id?: string
    startAt: string
    endAt: string
  }[]
  attendanceInfos: {
    id?: string
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
  email: string
  phoneNumber: string
  organizationId: string
  role: string
  address: {
    fullAddress: string
    longitude: number
    latitude: number
  }
  description: string
  isRegistered: boolean
  isAttendance: boolean
  canAccess: boolean
  roles: [
    {
      id?: string
      isRegistered?: boolean
      registered?: number
      approvedRegistered?: number
      name: string
      description: string
      isNeedApprove: boolean
      score: string
      quantity: string
      status: string
    }
  ]
  organizations: [
    {
      id: string
      name: string
      description: string
      email: string
      phoneNumber: string
      address: string
      imageUrl: string
      organizationId: string
      role: string
      status: string
      identityId?: string
      hostedEvents?: number
      created?: string
      lastModified?: string
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
      contacts: [
        {
          id: string
          name: string
          imageUrl: string
          gender: string
          birth: string
          email: string
          phoneNumber: string
          position: string
          address: string
          organizationRepId: string
          status: string
        }
      ]
    }
  ]
  created: {
    id: string
    at: string
    fullName: string
    imageUrl: string
  }
  modified: {
    id: string
    at: string
    fullName: string
    imageUrl: string
  }
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
  capacity: number
  registered: number
  attended: number
  rating: number
  approvedRegistered: number
  activity: {
    id: string
    name: string
    maxScore: number
    minScore: number
    eventCategoryId: string
    eventCategoryName: string
  }
  representativeOrganization: {
    id: string
    name: string
    email: string
    address: string
    phoneNumber: string
    imageUrl: string
    organizationId: string
    description: string
    role: string
    status: string
    identityId?: string
    hostedEvents?: number
    created?: string
    lastModified?: string
    representatives: RepresentativeType[]
    contacts: ContactType[]
  }
  nearestRegistrationInfoId: string
  nearestAttendanceInfoId: string
  hasOrganizedRegistration: boolean
}

export interface StudentAttendedEvent extends EventType {
  role: string
  score: number
  attendanceAt: string
}

export interface StudentAttendedEventsListType {
  total: number
  totalPages: number
  data: StudentAttendedEvent[]
}

export interface StudentRegisteredEvent extends EventType {
  roleId: string
  role: string
  score: number
}

export interface StudentRegisteredEventsListType {
  total: number
  totalPages: number
  data: StudentRegisteredEvent[]
}
