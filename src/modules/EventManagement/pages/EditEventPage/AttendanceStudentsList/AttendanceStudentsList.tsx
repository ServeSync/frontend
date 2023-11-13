import EventDetailAttendanceList from 'src/modules/EventManagement/components/EventDetail/EventDetailAttendanceList'

interface Props {
  page: number
  index: number
}

const AttendanceStudentsList = ({ page, index }: Props) => {
  return (
    <div role='tabpanel' hidden={page !== index} id='tab-1' aria-controls='simple-tabpanel-1'>
      {page === index && <EventDetailAttendanceList />}
    </div>
  )
}

export default AttendanceStudentsList
