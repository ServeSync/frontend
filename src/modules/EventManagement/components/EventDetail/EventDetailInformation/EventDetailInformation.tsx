import { EventDetailType } from 'src/modules/EventManagement/interfaces'

interface Props {
  event: EventDetailType
}
const EventDetailInformation = ({ event }: Props) => {
  return (
    <div className='w-full flex flex-col gap-40'>
      <div className='flex flex-col gap-5'>
        <h1 className=' text-[24px] font-normal break-words text-[#26C6DA]'>Thông tin chung</h1>
        <div className='text-[24px] font-normal break-words'>{event?.description}</div>
      </div>
    </div>
  )
}

export default EventDetailInformation
