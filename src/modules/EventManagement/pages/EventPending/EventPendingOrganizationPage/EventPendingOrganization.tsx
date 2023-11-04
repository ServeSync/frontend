import EventPendingOrganization from 'src/modules/EventManagement/components/EventPending/EventPendingOrganization'
import { EventPendingType } from 'src/modules/EventManagement/interfaces'

interface Props {
  page: number
  index: number
  eventPending: EventPendingType
}
const EventPendingOrganizationPage = ({ page, index, eventPending }: Props) => {
  return (
    <div role='tabpanel' hidden={page !== index} id='tab-2' aria-controls='simple-tabpanel-2'>
      {page === index && <EventPendingOrganization eventPending={eventPending} />}
    </div>
  )
}

export default EventPendingOrganizationPage
