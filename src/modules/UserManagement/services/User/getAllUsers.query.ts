/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import useQueryUserConfig from '../../hooks/useQueryUserConfig'
import userAPI from './user.api'
import { UsersListConfig, UsersListType } from '../../interfaces/User'

class GetAllUsersQuery {
  private _query
  private _queryUserConfig

  constructor() {
    this._queryUserConfig = useQueryUserConfig()
    this._query = useQuery({
      queryKey: ['users', this._queryUserConfig],
      queryFn: () => userAPI.getListUsers(this._queryUserConfig as UsersListConfig),
      keepPreviousData: true,
      staleTime: 3 * 60 * 1000
    })
  }

  fetch() {
    return this._query.data?.data as UsersListType
  }

  getTotalPages() {
    return this._query.data?.data.totalPages as number
  }

  isLoading() {
    return this._query.isLoading
  }
}

export { GetAllUsersQuery }
