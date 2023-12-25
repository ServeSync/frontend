/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import statisticAPI from './statistic.api'
import { TotalStatisticsType } from '../../interfaces'

class GetTotalStatisticsQuery {
  private _query

  constructor() {
    this._query = useQuery({
      queryKey: ['statistics'],
      queryFn: () => statisticAPI.getTotalStatistics(),
      keepPreviousData: true,
      staleTime: 3 * 60 * 1000
    })
  }

  fetch() {
    return this._query.data?.data as TotalStatisticsType
  }
}
export { GetTotalStatisticsQuery }
