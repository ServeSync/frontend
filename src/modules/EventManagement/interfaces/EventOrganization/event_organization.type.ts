import { ContactType, RepresentativeType } from '.'

export interface EventOrganizationsListType {
  total: number
  totalPages: number
  data: EventOrganizationType[]
}

export interface EventOrganizationType {
  id: string
  name: string
  description: string
  email: string
  phoneNumber: string
  address: string
  imageUrl: string
  role: string
  organizationId?: string
  representatives: RepresentativeType[]
  contacts: ContactType[]
}

export interface EventOrganizationForm {
  name: string
  description: string
  email: string
  phoneNumber: string
  address: string
  imageUrl: string
}
