import { RoleType } from 'src/modules/RoleManagement/interfaces/role.type'

export interface Profile {
  id: string
  email: string
  roles: RoleType[]
}
