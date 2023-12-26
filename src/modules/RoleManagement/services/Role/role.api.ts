import http from 'src/modules/Share/utils/http'
import { PermissionType, RoleType, RolesListType } from '../../interfaces'

const roleAPI = {
  getListRoles: () => http.get<RolesListType>('/roles'),

  getRoleById: (id: string) => http.get<RoleType>(`/roles/${id}`),

  createRole: (body: Omit<RoleType, 'id' | 'isDefault'>) => http.post<RoleType>('/roles', body),

  editRole: (body: { id: string; data: Omit<RoleType, 'id' | 'isDefault'> }) =>
    http.put<RoleType>(`/roles/${body.id}`, body.data),

  deleteRole: (id: string) => http.delete(`/roles/${id}`),

  getListPermissionsByRoleId: (id: string) => http.get<PermissionType[]>(`/roles/${id}/permissions`),

  editPermissionsByRoleId: (body: { id: string; data: string[] }) =>
    http.put<PermissionType>(`/roles/${body.id}/permissions`, body.data)
}

export default roleAPI
