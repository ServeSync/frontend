import { EventOrganizationRep } from '.'

export interface EventOrganization {
  organizationId?: string
  role?: string
  organizationReps?: EventOrganizationRep[]
}
