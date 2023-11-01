/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import permissionAPI from './permission.api'
import { PermissionType } from '../../interfaces'

class GetAllPermissionsQuery {
  private _query

  constructor() {
    this._query = useQuery({
      queryKey: ['permissions'],
      queryFn: () => permissionAPI.getListPermissions(),
      staleTime: 3 * 60 * 1000
    })
  }

  fetch() {
    return this._query.data?.data as PermissionType[]
  }

  isLoading() {
    return this._query.isLoading
  }
}

export { GetAllPermissionsQuery }
