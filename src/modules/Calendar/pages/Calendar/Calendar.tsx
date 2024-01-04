import { GetAllEventsForCalendarQuery } from 'src/modules/EventManagement/services'
import Scheduler from '../../components/Scheduler'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'

const Calendar = () => {
  const getAllEventsForCalendarQuery = new GetAllEventsForCalendarQuery(false)
  const events = getAllEventsForCalendarQuery.fetch()

  return (
    <Fragment>
      <Helmet>
        <title>Calendar</title>
        <meta name='description' content='This is Calendar page of the project' />
      </Helmet>
      <Scheduler events={events && events.data} />
    </Fragment>
  )
}

export default Calendar
