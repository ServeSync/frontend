import EventDetailRegisterList from 'src/modules/EventManagement/components/EventDetail/EventDetailRegisterList'
import { RegisteredStudentsListType } from 'src/modules/EventManagement/interfaces'

interface Props {
  page: number
  index: number
  registeredStudents: RegisteredStudentsListType
}
const EventDetailRegisterListPage = ({ page, index, registeredStudents }: Props) => {
  return (
    <div role='tabpanel' hidden={page !== index} id='tab-3' aria-controls='simple-tabpanel-3'>
      {page === index && <EventDetailRegisterList registeredStudents={registeredStudents} />}
    </div>
  )
}

export default EventDetailRegisterListPage
