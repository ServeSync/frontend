import { useEffect, useState } from 'react'
import { EventDetailType, LocationType } from '../../interfaces'
interface Props {
  event: EventDetailType
}
const EventDetailInfomation = ({ event }: Props) => {
  const [mapImageURL, setMapImageURL] = useState<string | null>(null)

  const center: LocationType = {
    latitude: event?.address.latitude,
    longitude: event?.address?.longitude
  }

  useEffect(() => {
    const googleMapsApiKey = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY
    const imageURL = `https://maps.googleapis.com/maps/api/staticmap?center=${center.latitude},${center.longitude}&markers=color:red%7C%7C${center.latitude},${center.longitude}&zoom=15&size=600x400&key=${googleMapsApiKey}`
    setMapImageURL(imageURL)
  }, [center])

  return (
    <div className='w-full flex flex-col gap-40'>
      <div className='flex flex-col gap-5'>
        <h1 className='uppercase text-[44px] font-normal break-words tracking-[8px] text-[#26C6DA]'>GIỚI THIỆU</h1>
        <div className='text-[24px] font-normal break-words'>{event?.description}</div>
      </div>
      <div className='flex flex-col gap-5'>
        <h1 className='uppercase text-[44px] font-normal break-words tracking-[8px] text-[#26C6DA]'>
          ĐỊA ĐIỂM TỔ CHỨC
        </h1>
        {mapImageURL && <img src={mapImageURL} alt='Static Map' className='w-full object-cover rounded-2xl' />}
      </div>
    </div>
  )
}

export default EventDetailInfomation
