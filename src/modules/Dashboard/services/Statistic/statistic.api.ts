import http from 'src/modules/Share/utils/http'
import {
  ListStatisticsType,
  StatisticConfig,
  StudentsStatisticConfig,
  StudentsStatisticType,
  TotalStatisticsType
} from '../../interfaces'

const statisticAPI = {
  getTotalStatistics: () => http.get<TotalStatisticsType>('/statistics'),

  getListRegisteredStudentsOfStatisticQuery: (params: StudentsStatisticConfig) =>
    http.get<StudentsStatisticType[]>('/events/registered-students/statistic', { params }),

  getListAttendanceStudentsOfStatisticQuery: (params: StudentsStatisticConfig) =>
    http.get<StudentsStatisticType[]>('/events/attendance-students/statistic', { params }),

  getListEventsOfStatisticQuery: (params: StatisticConfig) =>
    http.get<ListStatisticsType>('/events/statistic', { params }),

  getListProofsOfStatisticQuery: (params: StatisticConfig) =>
    http.get<ListStatisticsType>('/proofs/statistics', { params })
}

export default statisticAPI
