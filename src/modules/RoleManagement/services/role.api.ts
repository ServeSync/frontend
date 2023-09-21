import http from 'src/modules/Share/utils/http'
import { Role } from '../interfaces/role.type'
import { PermissionType } from '../interfaces/permission.type'

const roleAPI = {
  getListRoles: () => http.get<{ total: number; totalPages: number; data: Role[] }>('/roles'),

  createRole: (body: Omit<Role, 'id'>) => http.post<Role>('/roles', body),

  getRole: (id: string) => http.get<Role>(`/roles/${id}`),

  editRole: (body: { id: string; data: Omit<Role, 'id'> }) => http.put<Role>(`/roles/${body.id}`, body.data),

  deleteRole: (id: string) => http.delete(`/roles/${id}`),

  getPermissionsOfRole: (id: string) => http.get<PermissionType[]>(`/roles/${id}/permissions`),

  editPermissionsOfRole: (body: { id: string; data: string[] }) =>
    http.put<PermissionType>(`/roles/${body.id}/permissions`, body.data)
}

export default roleAPI
