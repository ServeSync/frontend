/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import { PermissionType } from '../../interfaces'
import roleAPI from './role.api'

class GetAllPermissionsByRoleIdQuery {
  private _query

  constructor(id: string) {
    this._query = useQuery({
      queryKey: ['permissionsByRoleId', id],
      queryFn: () => roleAPI.getListPermissionsByRoleId(id),
      enabled: id !== undefined
    })
  }

  fetch() {
    return this._query.data?.data as PermissionType[]
  }
}

export { GetAllPermissionsByRoleIdQuery }
