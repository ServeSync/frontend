export interface UsersListType {
  total: number
  totalPages: number
  data: UserType[]
}

export interface UserType {
  id: string
  userName: string
  email: string
}

export interface UserDataType {
  id: string
  userName: string
  email: string
  tenants: [
    {
      id: string
      name: string
      avatarUrl: string
    }
  ]
}
