import http from 'src/modules/Share/utils/http'
import { FormRejectRegistrationEventType } from '../../utils'

const studentAPI = {
  approveRegistration: (id: string, eventRegisterId: string) =>
    http.post(`/students/${id}/event-registers/${eventRegisterId}/approve`),

  rejectRegistration: (body: { id: string; eventRegisterId: string; data: FormRejectRegistrationEventType }) =>
    http.post(`/students/${body.id}/event-registers/${body.eventRegisterId}/reject`, body.data)
}

export default studentAPI
