import EventDetailRegister from '../../components/EventDetailRegister'

interface Props {
  page: number
  index: number
}
const EventDetailRegisterPage = ({ page, index }: Props) => {
  return (
    <div role='tabpanel' hidden={page !== index} id='tab-2' aria-controls='simple-tabpanel-2'>
      {page === index && <EventDetailRegister />}
    </div>
  )
}

export default EventDetailRegisterPage
