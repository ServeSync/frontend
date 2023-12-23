/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import statisticAPI from './statistic.api'
import { StudentsStatisticType } from '../../interfaces'

class GetAllRegisteredStudentsOfStatisticQuery {
  private _query

  constructor(type?: string) {
    this._query = useQuery({
      queryKey: ['statistic_registered_students', type],
      queryFn: () => statisticAPI.getListRegisteredStudentsOfStatisticQuery(type),
      keepPreviousData: true,
      staleTime: 3 * 60 * 1000
    })
  }

  fetch() {
    return this._query.data?.data as StudentsStatisticType[]
  }
}
export { GetAllRegisteredStudentsOfStatisticQuery }
