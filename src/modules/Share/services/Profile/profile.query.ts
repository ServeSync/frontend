/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import profileAPI from './profile.api'
import { Profile } from '../../interfaces'

class GetProfileQuery {
  private query

  constructor() {
    this.query = useQuery({
      queryKey: ['profile'],
      queryFn: () => profileAPI.getProfile()
    })
  }

  fetch() {
    return this.query.data?.data as Profile
  }

  getQuery() {
    return this.query
  }

  isLoading() {
    return this.query.isLoading
  }
}

export { GetProfileQuery }
