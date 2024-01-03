import Fullcalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useEffect, useState } from 'react'
import { EventType } from 'src/modules/EventManagement/interfaces'
import { EventCalendarType } from '../../interfaces'
import viLocale from '@fullcalendar/core/locales/vi'

interface Props {
  events: EventType[]
}

const Scheduler = ({ events }: Props) => {
  const [calendar, setCalendar] = useState<EventCalendarType[]>([])

  useEffect(() => {
    const listEvents: EventCalendarType[] = []
    events &&
      events.map((event: EventType) => {
        listEvents.push({
          title: event.name,
          start: event.startAt,
          end: event.endAt
        })
      })
    setCalendar(listEvents)
  }, [events])

  return (
    <div>
      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={'dayGridMonth'}
        headerToolbar={{
          start: 'dayGridMonth,timeGridWeek,timeGridDay',
          center: 'title',
          end: 'prev,next today'
        }}
        locale={viLocale}
        dayHeaderClassNames={'bg-[#50a6b1]'}
        dayCellClassNames={'p-4'}
        height={'90vh'}
        eventTimeFormat={{
          hour: 'numeric',
          minute: '2-digit',
          meridiem: 'short'
        }}
        eventColor='#26C6D4'
        events={calendar}
      />
    </div>
  )
}

export default Scheduler
