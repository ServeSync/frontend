export type Permission = string

export interface Profile {
  id: string
  fullName: string
  email: string
  avatarUrl: string
  tenantId: string
  isTenantOwner: boolean
  roles: string[]
  permissions: Permission[]
  tenants: Tenants[]
}

export interface ProfileStudent {
  faculty: {
    id: string
    name: string
  }
  homeRoom: {
    id: string
    name: string
    facultyId: string
  }
  educationProgram: {
    id: string
    name: string
    requiredActivityScore: number
    requiredCredit: number
  }
  id: string
  code: string
  fullName: string
  gender: boolean
  dateOfBirth: string
  homeTown: string
  address: string
  imageUrl: string
  citizenId: string
  email: string
  phone: string
  identityId: string
  score: string
}

export interface Tenants {
  id: string
  name: string
  avatarUrl: string
}

export interface TenantId {
  tenantId: string
}
