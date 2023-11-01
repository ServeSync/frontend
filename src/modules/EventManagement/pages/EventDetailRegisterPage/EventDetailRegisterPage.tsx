import EventDetailRegister from '../../components/EventDetailRegister'
import { AttendanceStudentsListType, EventDetailType, RegisteredStudentsListType } from '../../interfaces'

interface Props {
  page: number
  index: number
  event: EventDetailType
  registeredStudents: RegisteredStudentsListType
  attendanceStudents: AttendanceStudentsListType
}
const EventDetailRegisterPage = ({ page, index, event, registeredStudents, attendanceStudents }: Props) => {
  return (
    <div role='tabpanel' hidden={page !== index} id='tab-2' aria-controls='simple-tabpanel-2'>
      {page === index && (
        <EventDetailRegister
          event={event}
          registeredStudents={registeredStudents}
          attendanceStudents={attendanceStudents}
        />
      )}
    </div>
  )
}

export default EventDetailRegisterPage
