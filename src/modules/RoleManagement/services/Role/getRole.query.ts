/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import roleAPI from './role.api'
import { RoleType } from '../../interfaces'

class GetRoleQuery {
  private _query

  constructor(id: string, param?: string) {
    this._query = useQuery({
      queryKey: ['role', id],
      queryFn: () => roleAPI.getRole(id),
      enabled: id !== undefined && param === 'roles'
    })
  }

  fetch() {
    return this._query.data?.data as RoleType
  }
}

export { GetRoleQuery }
