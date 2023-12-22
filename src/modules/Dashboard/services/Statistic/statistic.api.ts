import http from 'src/modules/Share/utils/http'
import { StatisticListConfig, StatisticType } from '../../interfaces'

const statisticAPI = {
  getListRegisteredStudentsOfStatisticQuery: (params: StatisticListConfig) =>
    http.get<StatisticType[]>('/events/registered-students/statistic', { params }),

  getListAttendanceStudentsOfStatisticQuery: (params: StatisticListConfig) =>
    http.get<StatisticType[]>('/events/attendance-students/statistic', { params })
}

export default statisticAPI
