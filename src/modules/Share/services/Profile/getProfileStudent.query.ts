/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import profileAPI from './profile.api'
import { ProfileStudent } from '../../interfaces/Profile'

class GetProfileStudentQuery {
  private _query

  constructor(isAuthenticated: boolean) {
    this._query = useQuery({
      queryKey: ['profile_student'],
      queryFn: () => profileAPI.getProfileStudent(),
      enabled: isAuthenticated
    })
  }

  fetch() {
    return this._query.data?.data as ProfileStudent
  }

  isLoading() {
    return this._query.isLoading || this._query.isRefetching
  }
}

export { GetProfileStudentQuery }
