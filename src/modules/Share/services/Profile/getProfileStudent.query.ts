/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import profileAPI from './profile.api'
import { ProfileStudent } from '../../interfaces/Profile'

class GetProfileStudentQuery {
  private _query

  constructor() {
    this._query = useQuery({
      queryKey: ['profile'],
      queryFn: () => profileAPI.getProfileStudent(),
      staleTime: 3 * 60 * 1000
    })
  }

  fetch() {
    return this._query.data?.data as ProfileStudent
  }

  isLoading() {
    return this._query.isLoading
  }
}

export { GetProfileStudentQuery }
