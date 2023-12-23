import http from 'src/modules/Share/utils/http'
import { ListEventsStatisticType, StatisticType } from '../../interfaces'

const statisticAPI = {
  getListRegisteredStudentsOfStatisticQuery: (type?: string) =>
    http.get<StatisticType[]>('/events/registered-students/statistic', { params: { type } }),

  getListAttendanceStudentsOfStatisticQuery: (type?: string) =>
    http.get<StatisticType[]>('/events/attendance-students/statistic', { params: { type } }),

  getListEventsOfStatisticQuery: (type?: string) =>
    http.get<ListEventsStatisticType>('/events/statistic', { params: { type } })
}

export default statisticAPI
