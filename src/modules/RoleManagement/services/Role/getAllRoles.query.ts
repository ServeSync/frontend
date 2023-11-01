/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import roleAPI from './role.api'
import { RoleType } from '../../interfaces'

class GetAllRolesQuery {
  private _query

  constructor() {
    this._query = useQuery({
      queryKey: ['roles'],
      queryFn: () => roleAPI.getListRoles(),
      keepPreviousData: true,
      staleTime: 3 * 60 * 1000
    })
  }

  fetch() {
    return this._query.data?.data.data as RoleType[]
  }

  isLoading() {
    return this._query.isLoading
  }
}

export { GetAllRolesQuery }
