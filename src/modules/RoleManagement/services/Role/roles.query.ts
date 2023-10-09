/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import roleAPI from './role.api'
import { RoleType } from '../../interfaces'

class GetAllRoleQuery {
  private query

  constructor() {
    this.query = useQuery({
      queryKey: ['roles'],
      queryFn: () => roleAPI.getListRoles(),
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000
    })
  }

  fetch() {
    return this.query.data?.data.data as RoleType[]
  }

  getQuery() {
    return this.query
  }

  isLoading() {
    return this.query.isLoading
  }
}

export { GetAllRoleQuery }
