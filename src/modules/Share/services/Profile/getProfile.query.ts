/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import { Profile } from 'src/modules/Share/interfaces'
import profileAPI from 'src/modules/Share/services/Profile/profile.api'
import { handleError } from 'src/modules/Share/utils'

class GetProfileQuery {
  private _query

  constructor(isAuthenticated: boolean) {
    this._query = useQuery({
      queryKey: ['profile'],
      queryFn: () => profileAPI.getProfile(),
      enabled: isAuthenticated,
      staleTime: 1 * 60 * 1000,
      onError: (error: any) => {
        handleError(error)
      }
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
