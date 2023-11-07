import { Fragment } from 'react'
import { EventsListType } from 'src/modules/EventManagement/interfaces'
import CardEvent from '../CardEvent'

interface Props {
  events: EventsListType
}
const ListEventCard = ({ events }: Props) => {
  return (
    <Fragment>
      <div className='grid grid-cols-3 gap-12 max-w-screen-xl mx-auto'>
        {events &&
          events.data.length > 0 &&
          events.data.map((event, index) => {
            if (event.status === 'Happening' || event.status === 'Upcoming' || event.status === 'Done') {
              return <CardEvent event={event} key={index} />
            }
          })}
      </div>
    </Fragment>
  )
}

export default ListEventCard
