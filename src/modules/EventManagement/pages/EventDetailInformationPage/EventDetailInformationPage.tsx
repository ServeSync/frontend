import EventDetailInformation from '../../components/EventDetailInformation'

interface Props {
  page: number
  index: number
}
const EventDetailInformationPage = ({ page, index }: Props) => {
  return (
    <div role='tabpanel' hidden={page !== index} id='tab-1' aria-controls='simple-tabpanel-1'>
      {page === index && <EventDetailInformation />}
    </div>
  )
}

export default EventDetailInformationPage
