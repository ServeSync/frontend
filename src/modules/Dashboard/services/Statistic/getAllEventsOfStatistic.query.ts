/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import statisticAPI from './statistic.api'
import { ListStatisticsType, StatisticConfig } from '../../interfaces'

class GetAllEventsOfStatisticQuery {
  private _query

  constructor(params: StatisticConfig) {
    this._query = useQuery({
      queryKey: ['events', params],
      queryFn: () => statisticAPI.getListEventsOfStatisticQuery(params),
      keepPreviousData: true,
      staleTime: 3 * 60 * 1000
    })
  }

  fetch() {
    return this._query.data?.data as ListStatisticsType
  }
}
export { GetAllEventsOfStatisticQuery }
