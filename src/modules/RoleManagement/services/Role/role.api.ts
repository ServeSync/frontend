import http from 'src/modules/Share/utils/http'
import { PermissionType, RoleType, RolesListType } from '../../interfaces'

const roleAPI = {
  getListRoles: () => http.get<RolesListType>('/roles'),

  createRole: (body: Omit<RoleType, 'id'>) => http.post<RoleType>('/roles', body),

  getRole: (id: string) => http.get<RoleType>(`/roles/${id}`),

  editRole: (body: { id: string; data: Omit<RoleType, 'id'> }) => http.put<RoleType>(`/roles/${body.id}`, body.data),

  deleteRole: (id: string) => http.delete(`/roles/${id}`),

  getListPermissionsByRoleId: (id: string) => http.get<PermissionType[]>(`/roles/${id}/permissions`),

  editPermissionsByRoleId: (body: { id: string; data: string[] }) =>
    http.put<PermissionType>(`/roles/${body.id}/permissions`, body.data)
}

export default roleAPI
