/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import statisticAPI from './statistic.api'
import { ListEventsStatisticType } from '../../interfaces'

class GetAllEventsOfStatisticQuery {
  private _query

  constructor(type?: string) {
    this._query = useQuery({
      queryKey: ['events', type],
      queryFn: () => statisticAPI.getListEventsOfStatisticQuery(type),
      keepPreviousData: true,
      staleTime: 3 * 60 * 1000
    })
  }

  fetch() {
    return this._query.data?.data as ListEventsStatisticType
  }
}
export { GetAllEventsOfStatisticQuery }
