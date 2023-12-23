/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import statisticAPI from './statistic.api'
import { StatisticType } from '../../interfaces'

class GetAllAttendanceStudentsOfStatisticQuery {
  private _query

  constructor(type?: string) {
    this._query = useQuery({
      queryKey: ['statistic_attendance_students', type],
      queryFn: () => statisticAPI.getListAttendanceStudentsOfStatisticQuery(type),
      keepPreviousData: true,
      staleTime: 3 * 60 * 1000
    })
  }

  fetch() {
    return this._query.data?.data as StatisticType[]
  }
}
export { GetAllAttendanceStudentsOfStatisticQuery }
