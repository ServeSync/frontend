import EventDetailAttendanceList from 'src/modules/EventManagement/components/EventDetail/EventDetailAttendanceList'
import { AttendanceStudentsListType } from 'src/modules/EventManagement/interfaces'

interface Props {
  page: number
  index: number
  attendanceStudents: AttendanceStudentsListType
}
const EventDetailAttendanceListPage = ({ page, index, attendanceStudents }: Props) => {
  return (
    <div role='tabpanel' hidden={page !== index} id='tab-4' aria-controls='simple-tabpanel-4'>
      {page === index && <EventDetailAttendanceList attendanceStudents={attendanceStudents} />}
    </div>
  )
}

export default EventDetailAttendanceListPage
