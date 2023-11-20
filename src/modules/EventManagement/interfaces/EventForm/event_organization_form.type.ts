export interface EventOrganizationFormType {
  id?: string
  organizationId: string
  role: string
  organizationReps: EventOrganizationRepFormType[]
}

export interface EventOrganizationRepFormType {
  id?: string
  organizationRepId: string
  role: string
}
