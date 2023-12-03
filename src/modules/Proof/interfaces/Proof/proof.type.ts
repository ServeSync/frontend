export interface ProofListType {
  total: number
  totalPages: number
  data: ProofType[]
}
export interface ProofType {
  id: string
  proofStatus: string
  proofType: string
  eventName: string
  organizationName: string
  address: string
  imageUrl: string
  startAt: string
  endAt: string
  student: {
    id: string
    fullName: string
    imageUrl: string
  }
  created: string
  lastModified: string
}

export interface ProofDetailType {
  description: string
  rejectReason: string
  id: string
  proofStatus: string
  proofType: string
  eventName: string
  organizationName: string
  role: string
  address: string
  imageUrl: string
  score: number
  student: {
    id: string
    fullName: string
    imageUrl: string
    email: string
  }
  activity: {
    minScore: number
    maxScore: number
    eventCategoryId: string
    id: string
    name: string
  }
  startAt: string
  endAt: string
  created: string
  lastModified: string
  attendanceAt: string
}
