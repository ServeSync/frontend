import { EventOrganizationRepFormType } from '.'

export interface EventOrganizationFormType {
  organizationId: string
  role: string
  organizationReps: EventOrganizationRepFormType[]
}
