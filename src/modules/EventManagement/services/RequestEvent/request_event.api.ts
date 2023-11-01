import http from 'src/modules/Share/utils/http'
import { RequestEventForm } from '../../interfaces/RequestEventForm/request_event-form.type'

const requestEventAPI = {
  requestCreateEvent: (body: RequestEventForm) => http.post('/event-collaboration-requests', body)
}

export default requestEventAPI
