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
