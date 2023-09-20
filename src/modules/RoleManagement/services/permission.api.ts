import http from 'src/modules/Share/utils/http'
import { Permission } from '../interfaces/permission.type'

const permissionAPI = {
  getListPermissions: () => http.get<Permission[]>('/permissions'),
  getRolePermissions: (id: string) => http.get<Permission[]>(`/roles/${id}/permissions`),
  editPermission: (body: { id: string; data: string[] }) =>
    http.put<Permission>(`/roles/${body.id}/permissions`, body.data)
}

export default permissionAPI
