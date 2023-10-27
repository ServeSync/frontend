export interface EventOrganizationFormType {
  organizationId: string
  role: string
  organizationReps: EventOrganizationRepFormType[]
}

export interface EventOrganizationRepFormType {
  organizationRepId: string
  role: string
}
