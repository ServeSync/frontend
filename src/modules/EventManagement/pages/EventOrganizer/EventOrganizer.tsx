import EventOrganizerForm from '../../components/EventOrganizerForm'

interface Props {
  page: number
  index: number
}

const EventOrganizer = ({ page, index }: Props) => {
  return (
    <div role='tabpanel' hidden={page !== index} id='tab-3' aria-controls='simple-tabpanel-3'>
      {page === index && <EventOrganizerForm />}
    </div>
  )
}

export default EventOrganizer
