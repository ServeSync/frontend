import { EventDetailType } from 'src/modules/EventManagement/interfaces'
import Parser from 'html-react-parser'

interface Props {
  event: EventDetailType
}

const EventDetailInformation = ({ event }: Props) => {
  return (
    <div className='w-full flex flex-col gap-40'>
      <div className='flex flex-col gap-5'>
        <div className='text-[16px] font-normal break-words text-justify'>{Parser(event?.description)}</div>
      </div>
    </div>
  )
}

export default EventDetailInformation
