import http from 'src/modules/Share/utils/http'
import { PermissionType } from '../interfaces/permission.type'

const permissionAPI = {
  getListPermissions: () => http.get<PermissionType[]>('/permissions')
}

export default permissionAPI
