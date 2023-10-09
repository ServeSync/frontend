/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import roleAPI from './role.api'
import { RoleType } from '../../interfaces'
import useQueryRoleConfig from '../../hooks/useQueryRoleConfig'

class GetRoleQuery {
  private query
  private queryRoleConfig

  constructor(param?: string) {
    this.queryRoleConfig = useQueryRoleConfig()
    this.query = useQuery({
      queryKey: ['role', this.queryRoleConfig],
      queryFn: () => roleAPI.getRole(this.queryRoleConfig.id as string),
      enabled: this.queryRoleConfig.id !== undefined && param === 'roles'
    })
  }

  fetch() {
    return this.query.data?.data as RoleType
  }

  getQuery() {
    return this.query
  }
}

export { GetRoleQuery }
