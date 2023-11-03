/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import roleAPI from './role.api'
import { RoleType } from '../../interfaces'

class GetRoleByIdQuery {
  private _query

  constructor(id: string) {
    this._query = useQuery({
      queryKey: ['role', id],
      queryFn: () => roleAPI.getRoleById(id),
      enabled: id !== undefined
    })
  }

  fetch() {
    return this._query.data?.data as RoleType
  }
}

export { GetRoleByIdQuery }
