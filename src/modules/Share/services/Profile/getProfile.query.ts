/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import profileAPI from './profile.api'
import { Profile } from '../../interfaces'

class GetProfileQuery {
  private _query

  constructor(isAuthenticated: boolean) {
    this._query = useQuery({
      queryKey: ['profile'],
      queryFn: () => profileAPI.getProfile(),
      enabled: isAuthenticated
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
