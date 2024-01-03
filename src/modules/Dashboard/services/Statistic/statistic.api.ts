import http from 'src/modules/Share/utils/http'
import { ListStatisticsType, StatisticConfig, StudentsStatisticType, TotalStatisticsType } from '../../interfaces'

const statisticAPI = {
  getTotalStatistics: () => http.get<TotalStatisticsType>('/statistics'),

  getListRegisteredStudentsOfStatisticQuery: (type?: string) =>
    http.get<StudentsStatisticType[]>('/events/registered-students/statistic', { params: { type } }),

  getListAttendanceStudentsOfStatisticQuery: (type?: string) =>
    http.get<StudentsStatisticType[]>('/events/attendance-students/statistic', { params: { type } }),

  getListEventsOfStatisticQuery: (params: StatisticConfig) =>
    http.get<ListStatisticsType>('/events/statistic', { params }),

  getListProofsOfStatisticQuery: (params: StatisticConfig) =>
    http.get<ListStatisticsType>('/proofs/statistics', { params })
}

export default statisticAPI
