import http from 'src/modules/Share/utils/http'
import { requestEventForm } from '../../interfaces/RequestEventForm/requestEventForm.type'

const requestEventAPI = {
  requestCreateEvent: (body: requestEventForm) => http.post('/event-collaboration-requests', body)
}

export default requestEventAPI
