import EventDetailRegisterList from 'src/modules/EventManagement/components/EventDetail/EventDetailRegisterList'
import { RegisteredStudentsListType } from 'src/modules/EventManagement/interfaces'

interface Props {
  page: number
  index: number
  registeredStudents: RegisteredStudentsListType
}

const RegisteredStudentsList = ({ page, index, registeredStudents }: Props) => {
  return (
    <div role='tabpanel' hidden={page !== index} id='tab-1' aria-controls='simple-tabpanel-1'>
      {page === index && <EventDetailRegisterList registeredStudents={registeredStudents} />}
    </div>
  )
}

export default RegisteredStudentsList
