import { GetAllEventsForCalendarQuery } from 'src/modules/EventManagement/services'
import Scheduler from '../../components/Scheduler'

const Calendar = () => {
  const getAllEventsForCalendarQuery = new GetAllEventsForCalendarQuery(false)
  const events = getAllEventsForCalendarQuery.fetch()

  return <Scheduler events={events && events.data} />
}

export default Calendar
