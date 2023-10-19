import { RoleType } from 'src/modules/RoleManagement/interfaces'

export interface Profile {
  id: string
  email: string
  avatarUrl: string
  roles: RoleType[]
}
