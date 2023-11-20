export interface ContactsListType {
  total: number
  totalPages: number
  data: RepresentativeType[]
}

export interface RepresentativeType {
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

export interface ContactType {
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
}
