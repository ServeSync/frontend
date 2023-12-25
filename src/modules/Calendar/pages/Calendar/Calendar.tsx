import { GetAllEventsQuery } from 'src/modules/EventManagement/services'
import Scheduler from '../../components/Scheduler'

const Calendar = () => {
  const getAllEventsQuery = new GetAllEventsQuery()
  const events = getAllEventsQuery.fetch()

  return <Scheduler events={events && events.data} />
}

export default Calendar
