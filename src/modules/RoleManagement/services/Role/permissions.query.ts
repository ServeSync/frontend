/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import { PermissionType } from '../../interfaces'
import roleAPI from './role.api'
import useQueryRoleConfig from '../../hooks/useQueryRoleConfig'

class GetAllPermissionByRoleIdQuery {
  private query
  private queryRoleConfig

  constructor() {
    this.queryRoleConfig = useQueryRoleConfig()
    this.query = useQuery({
      queryKey: ['permissions', this.queryRoleConfig],
      queryFn: () => roleAPI.getListPermissionsByRoleId(this.queryRoleConfig.id as string),
      enabled: this.queryRoleConfig.id !== undefined
    })
  }

  fetch() {
    return this.query.data?.data as PermissionType[]
  }

  getQuery() {
    return this.query
  }
}

export { GetAllPermissionByRoleIdQuery }
