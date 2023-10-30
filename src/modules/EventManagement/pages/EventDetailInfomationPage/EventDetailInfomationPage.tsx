import EventDetailInfomation from '../../components/EventDetailInfomation'

interface Props {
  page: number
  index: number
}
const EventDetailInfomationPage = ({ page, index }: Props) => {
  return (
    <div role='tabpanel' hidden={page !== index} id='tab-1' aria-controls='simple-tabpanel-1'>
      {page === index && <EventDetailInfomation />}
    </div>
  )
}

export default EventDetailInfomationPage
