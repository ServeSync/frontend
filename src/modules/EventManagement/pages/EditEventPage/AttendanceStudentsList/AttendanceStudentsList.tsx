import EventDetailAttendanceList from 'src/modules/EventManagement/components/EventDetail/EventDetailAttendanceList'
import { AttendanceStudentsListType } from 'src/modules/EventManagement/interfaces'

interface Props {
  page: number
  index: number
  attendanceStudents: AttendanceStudentsListType
}

const AttendanceStudentsList = ({ page, index, attendanceStudents }: Props) => {
  return (
    <div role='tabpanel' hidden={page !== index} id='tab-1' aria-controls='simple-tabpanel-1'>
      {page === index && <EventDetailAttendanceList attendanceStudents={attendanceStudents} />}
    </div>
  )
}

export default AttendanceStudentsList
