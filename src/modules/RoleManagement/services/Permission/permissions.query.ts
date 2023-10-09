/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import permissionAPI from './permission.api'
import { PermissionType } from '../../interfaces'

class GetAllPermissionQuery {
  private query

  constructor() {
    this.query = useQuery({
      queryKey: ['permissions'],
      queryFn: () => permissionAPI.getListPermissions(),
      staleTime: 5 * 60 * 1000
    })
  }

  fetch() {
    return this.query.data?.data as PermissionType[]
  }

  getQuery() {
    return this.query
  }

  isLoading() {
    return this.query.isLoading
  }
}

export { GetAllPermissionQuery }
