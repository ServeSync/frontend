import http from 'src/modules/Share/utils/http'
import { UserDataType, UsersListConfig, UsersListType } from '../../interfaces/User'
import { RoleOfTenant } from '../../interfaces'

const userAPI = {
  getListUsers: (params: UsersListConfig) => http.get<UsersListType>('/users', { params }),

  getUserDetail: (id: string) => http.get<UserDataType>(`/users/${id}`),

  getRolesOfTenant: (body: { id: string; tenantId: string }) =>
    http.get<RoleOfTenant[]>(`/users/${body.id}/tenants/${body.tenantId}/roles`),

  editRolesOfTenant: (body: { id: string; tenantId: string; data: string[] }) =>
    http.put(`/users/${body.id}/tenants/${body.tenantId}/roles`, body.data)
}

export default userAPI
