import EventDetailAttendanceList from 'src/modules/EventManagement/components/EventDetail/EventDetailAttendanceList'

interface Props {
  page: number
  index: number
}
const EventDetailAttendanceListPage = ({ page, index }: Props) => {
  return (
    <div role='tabpanel' hidden={page !== index} id='tab-4' aria-controls='simple-tabpanel-4' className='px-[10%]'>
      {page === index && <EventDetailAttendanceList />}
    </div>
  )
}

export default EventDetailAttendanceListPage
