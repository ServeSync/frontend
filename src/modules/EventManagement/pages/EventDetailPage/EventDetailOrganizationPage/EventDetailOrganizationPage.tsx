import EventDetailOrganization from 'src/modules/EventManagement/components/EventDetail/EventDetailOrganization'
import { EventDetailType } from '../../../interfaces'

interface Props {
  page: number
  index: number
  event: EventDetailType
}

const EventDetailOrganizationPage = ({ page, index, event }: Props) => {
  return (
    <div role='tabpanel' hidden={page !== index} id='tab-2' aria-controls='simple-tabpanel-2' className='px-[10%]'>
      {page === index && <EventDetailOrganization event={event} />}
    </div>
  )
}

export default EventDetailOrganizationPage
