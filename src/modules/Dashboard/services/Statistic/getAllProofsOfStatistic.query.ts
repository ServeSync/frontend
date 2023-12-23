/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import statisticAPI from './statistic.api'
import { ListStatisticType } from '../../interfaces'

class GetAllProofsOfStatisticQuery {
  private _query

  constructor(type?: string) {
    this._query = useQuery({
      queryKey: ['proofs', type],
      queryFn: () => statisticAPI.getListProofsOfStatisticQuery(type),
      keepPreviousData: true,
      staleTime: 3 * 60 * 1000
    })
  }

  fetch() {
    return this._query.data?.data as ListStatisticType
  }
}
export { GetAllProofsOfStatisticQuery }
