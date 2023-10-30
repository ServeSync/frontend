import http from 'src/modules/Share/utils/http'
import { requestEventForm } from '../../interfaces/RequestEventForm/request_event-form.type'

const requestEventAPI = {
  requestCreateEvent: (body: requestEventForm) => http.post('/event-collaboration-requests', body)
}

export default requestEventAPI
