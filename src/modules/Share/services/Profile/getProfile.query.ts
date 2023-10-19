/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import profileAPI from './profile.api'
import { Profile } from '../../interfaces/Profile'

class GetProfileQuery {
  private _query

  constructor() {
    this._query = useQuery({
      queryKey: ['profile'],
      queryFn: () => profileAPI.getProfile(),
      staleTime: 5 * 60 * 1000
    })
  }

  fetch() {
    return this._query.data?.data as Profile
  }

  isLoading() {
    return this._query.isLoading
  }
}

export { GetProfileQuery }
