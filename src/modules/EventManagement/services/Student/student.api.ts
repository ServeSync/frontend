import http from 'src/modules/Share/utils/http'

const studentAPI = {
  approveStudent: (id: string, eventRegisterId: string) =>
    http.post(`/students/${id}/event-registers/${eventRegisterId}/approve`),

  rejectStudent: (id: string, eventRegisterId: string, rejectReason: string) =>
    http.post(`/students/${id}/event-registers/${eventRegisterId}/reject`, rejectReason)
}

export default studentAPI
