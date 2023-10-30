import EventDetailOrganizer from '../../components/EventDetailOrganizer'

interface Props {
  page: number
  index: number
}
const EventDetailOrganizerPage = ({ page, index }: Props) => {
  return (
    <div role='tabpanel' hidden={page !== index} id='tab-3' aria-controls='simple-tabpanel-3'>
      {page === index && <EventDetailOrganizer />}
    </div>
  )
}

export default EventDetailOrganizerPage
