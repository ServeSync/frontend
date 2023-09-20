import { Role } from 'src/modules/RoleManagement/interfaces/role.type'

export interface ProfileResponse {
  id: string
  email: string
  roles: Role[]
}
