/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import statisticAPI from './statistic.api'
import { ListStatisticsType, StatisticConfig } from '../../interfaces'

class GetAllProofsOfStatisticQuery {
  private _query

  constructor(params: StatisticConfig) {
    this._query = useQuery({
      queryKey: ['proofs', params],
      queryFn: () => statisticAPI.getListProofsOfStatisticQuery(params),
      keepPreviousData: true,
      staleTime: 3 * 60 * 1000
    })
  }

  fetch() {
    return this._query.data?.data as ListStatisticsType
  }
}
export { GetAllProofsOfStatisticQuery }
