import http from 'src/modules/Share/utils/http'
import { ListStatisticsType, StudentsStatisticType, TotalStatisticsType } from '../../interfaces'

const statisticAPI = {
  getTotalStatistics: () => http.get<TotalStatisticsType>('/statistics'),

  getListRegisteredStudentsOfStatisticQuery: (type?: string) =>
    http.get<StudentsStatisticType[]>('/events/registered-students/statistic', { params: { type } }),

  getListAttendanceStudentsOfStatisticQuery: (type?: string) =>
    http.get<StudentsStatisticType[]>('/events/attendance-students/statistic', { params: { type } }),

  getListEventsOfStatisticQuery: (type?: string) =>
    http.get<ListStatisticsType>('/events/statistic', { params: { type } }),

  getListProofsOfStatisticQuery: (type?: string) =>
    http.get<ListStatisticsType>('/proofs/statistics', { params: { type } })
}

export default statisticAPI
