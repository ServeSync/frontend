import EventDetailOrganizer from '../../../components/EventDetail/EventDetailOrganization'
import { EventDetailType } from '../../../interfaces'

interface Props {
  page: number
  index: number
  event: EventDetailType
}
const EventDetailOrganizationPage = ({ page, index, event }: Props) => {
  return (
    <div role='tabpanel' hidden={page !== index} id='tab-2' aria-controls='simple-tabpanel-2'>
      {page === index && <EventDetailOrganizer event={event} />}
    </div>
  )
}

export default EventDetailOrganizationPage
