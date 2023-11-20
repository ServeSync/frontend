import EventDetailRegisterList from 'src/modules/EventManagement/components/EventDetail/EventDetailRegisterList'

interface Props {
  page: number
  index: number
}

const EventDetailRegisterListPage = ({ page, index }: Props) => {
  return (
    <div role='tabpanel' hidden={page !== index} id='tab-3' aria-controls='simple-tabpanel-3' className='px-[10%]'>
      {page === index && <EventDetailRegisterList />}
    </div>
  )
}

export default EventDetailRegisterListPage
