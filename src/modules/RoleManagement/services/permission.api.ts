import http from 'src/modules/Share/utils/http'
import { Permission } from '../interfaces/permission.type'

const permissionAPI = {
  getListPermissions: () => http.get<Permission[]>('/permissions')
}

export default permissionAPI
