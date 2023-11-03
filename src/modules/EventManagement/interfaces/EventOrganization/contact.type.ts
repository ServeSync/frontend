export interface ContactsListType {
  total: number
  totalPages: number
  data: ContactType[]
}

export interface ContactType {
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
