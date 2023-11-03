export interface RolesListType {
  total: number
  totalPages: number
  data: RoleType[]
}

export interface RoleType {
  id: string
  name: string
}
