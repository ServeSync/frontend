import http from 'src/modules/Share/utils/http'
import { ListStatisticType, StudentsStatisticType } from '../../interfaces'

const statisticAPI = {
  getListRegisteredStudentsOfStatisticQuery: (type?: string) =>
    http.get<StudentsStatisticType[]>('/events/registered-students/statistic', { params: { type } }),

  getListAttendanceStudentsOfStatisticQuery: (type?: string) =>
    http.get<StudentsStatisticType[]>('/events/attendance-students/statistic', { params: { type } }),

  getListEventsOfStatisticQuery: (type?: string) =>
    http.get<ListStatisticType>('/events/statistic', { params: { type } }),

  getListProofsOfStatisticQuery: (type?: string) =>
    http.get<ListStatisticType>('/proofs/statistics', { params: { type } })
}

export default statisticAPI
