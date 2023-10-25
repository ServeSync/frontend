import { ContactType } from '.'

export interface EventOrganizationsListType {
  total: number
  totalPages: number
  data: EventOrganizationType[]
}

export interface EventOrganizationType {
  id: string
  name: string
  email: string
  phoneNumber: string
  address: string
  imageUrl: string
  role: string
  contacts: ContactType[]
}
