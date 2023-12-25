/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import userAPI from './user.api'
import { UserDataType } from '../../interfaces/User'

class GetUserDetailQuery {
  private _query

  constructor(id: string) {
    this._query = useQuery({
      queryKey: ['user', id],
      queryFn: () => userAPI.getUserDetail(id),
      enabled: id !== undefined,
      staleTime: 3 * 60 * 1000
    })
  }

  fetch() {
    return this._query.data?.data as UserDataType
  }

  isLoading() {
    return this._query.isLoading
  }
}

export { GetUserDetailQuery }
