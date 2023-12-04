import http from 'src/modules/Share/utils/http'
import { EventActivityConfig, EventActivityType } from '../../interfaces'

const eventActivityAPI = {
  getListEventActivities: (params?: EventActivityConfig) =>
    http.get<EventActivityType[]>('/event-activities', { params: params })
}

export default eventActivityAPI
