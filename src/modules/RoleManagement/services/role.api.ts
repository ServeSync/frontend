import http from 'src/modules/Share/utils/http'
import { RoleType } from '../interfaces/role.type'
import { PermissionType } from '../interfaces/permission.type'

const roleAPI = {
  getListRoles: () => http.get<{ total: number; totalPages: number; data: RoleType[] }>('/roles'),

  createRole: (body: Omit<RoleType, 'id'>) => http.post<RoleType>('/roles', body),

  getRole: (id: string) => http.get<RoleType>(`/roles/${id}`),

  editRole: (body: { id: string; data: Omit<RoleType, 'id'> }) => http.put<RoleType>(`/roles/${body.id}`, body.data),

  deleteRole: (id: string) => http.delete(`/roles/${id}`),

  getPermissionsOfRole: (id: string) => http.get<PermissionType[]>(`/roles/${id}/permissions`),

  editPermissionsOfRole: (body: { id: string; data: string[] }) =>
    http.put<PermissionType>(`/roles/${body.id}/permissions`, body.data)
}

export default roleAPI
