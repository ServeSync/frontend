export interface ContactsListType {
  total: number
  totalPages: number
  data: ContactType[]
}

export interface ContactType {
  id: string
  name: string
  gender: boolean
  birth: string
  email: string
  phoneNumber: string
  address: string
  imageUrl: string
  position: string
  eventOrganizationId: string
  role: string
}
