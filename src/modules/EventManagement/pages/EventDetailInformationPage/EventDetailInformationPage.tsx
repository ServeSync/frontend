import EventDetailInformation from '../../components/EventDetailInformation'
import { EventDetailType } from '../../interfaces'

interface Props {
  page: number
  index: number
  event: EventDetailType
}
const EventDetailInformationPage = ({ page, index, event }: Props) => {
  return (
    <div role='tabpanel' hidden={page !== index} id='tab-1' aria-controls='simple-tabpanel-1'>
      {page === index && <EventDetailInformation event={event} />}
    </div>
  )
}

export default EventDetailInformationPage
