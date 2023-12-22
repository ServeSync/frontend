/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import statisticAPI from './statistic.api'
import useQueryStatisticConfig from '../../hooks/useQueryStatisticConfig'
import { StatisticType } from '../../interfaces'

class GetAllAttendanceStudentsOfStatisticQuery {
  private _query
  private _queryStatisticConfig

  constructor() {
    this._queryStatisticConfig = useQueryStatisticConfig()
    this._query = useQuery({
      queryKey: ['statistic_attendance_students', this._queryStatisticConfig],
      queryFn: () => statisticAPI.getListAttendanceStudentsOfStatisticQuery(this._queryStatisticConfig),
      keepPreviousData: true,
      staleTime: 3 * 60 * 1000
    })
  }

  fetch() {
    return this._query.data?.data as StatisticType[]
  }
}
export { GetAllAttendanceStudentsOfStatisticQuery }
