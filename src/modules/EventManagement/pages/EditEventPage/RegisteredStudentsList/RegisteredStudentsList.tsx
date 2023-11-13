import EventRegisterList from 'src/modules/EventManagement/components/EventForm/EventRegisterList'

interface Props {
  page: number
  index: number
}

const RegisteredStudentsList = ({ page, index }: Props) => {
  return (
    <div role='tabpanel' hidden={page !== index} id='tab-1' aria-controls='simple-tabpanel-1'>
      {page === index && <EventRegisterList />}
    </div>
  )
}

export default RegisteredStudentsList
