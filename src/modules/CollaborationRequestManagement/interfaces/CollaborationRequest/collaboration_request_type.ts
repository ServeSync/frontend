export interface CollaborationRequestType {
  id: string
  name: string
  introduction: string
  capacity: number
  imageUrl: string
  startAt: string
  endAt: string
  status: string
  type: string
  address: {
    fullAddress: string
    longitude: string
    latitude: string
  }
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
    eventCategoryId: string
    eventCategoryName: string
    minScore: number
    maxScore: number
  }
  eventId: string
}

export interface CollaborationRequestsListType {
  total: number
  totalPages: number
  data: CollaborationRequestType[]
}
