import http from 'src/modules/Share/utils/http'
import { Role } from '../interfaces/role.type'

const roleAPI = {
  getListRoles: () => http.get<{ total: number; totalPages: number; data: Role[] }>('/roles'),

  createRole: (body: Omit<Role, 'id'>) => http.post<Role>('/roles', body),

  getRole: (id: string) => http.get<Role>(`/roles/${id}`),

  editRole: (body: { id: string; data: Omit<Role, 'id'> }) => http.put<Role>(`/roles/${body.id}`, body.data),

  deleteRole: (id: string) => http.delete(`/roles/${id}`)
}

export default roleAPI
