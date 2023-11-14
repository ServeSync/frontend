import { ContactType, RepresentativeType } from '.'

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
  organizationId: string
  role: string
  representatives: RepresentativeType[]
  contacts: ContactType[]
}

export interface EventOrganizationForm {
  id: string
  name: string
  email: string
  address: string
  organizationId: string
  phoneNumber: string
  imageUrl: string
}
