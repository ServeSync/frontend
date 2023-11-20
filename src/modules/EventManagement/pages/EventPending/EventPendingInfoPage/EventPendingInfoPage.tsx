import EventPendingInformation from 'src/modules/EventManagement/components/EventPending/EventPendingInformation'
import { EventPendingType } from 'src/modules/EventManagement/interfaces'

interface Props {
  page: number
  index: number
  eventPending: EventPendingType
}
const EventPendingInfoPage = ({ page, index, eventPending }: Props) => {
  return (
    <div role='tabpanel' hidden={page !== index} id='tab-1' aria-controls='simple-tabpanel-1'>
      {page === index && <EventPendingInformation eventPending={eventPending} />}
    </div>
  )
}

export default EventPendingInfoPage
