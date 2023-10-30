import { Box, Flex } from '@chakra-ui/react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { useEffect, useState } from 'react'
import { LocationType, MarkerType } from '../../interfaces'

const EventDetailInfomation = () => {
  const [center] = useState<LocationType>({
    latitude: 16.074160300547344,
    longitude: 108.15078258893459
  })
  const [, setMap] = useState<google.maps.Map>()
  const [markers, setMarkers] = useState<MarkerType[]>([])

  useEffect(() => {
    setMarkers([...markers, { position: center }])
  }, [center, setMarkers])

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  })
  if (!isLoaded) {
    return null
  }

  return (
    <div className='w-full flex flex-col gap-40'>
      <div className='flex flex-col gap-5'>
        <h1 className='uppercase text-[44px] font-normal break-words tracking-[8px] text-[#26C6DA]'>GIỚI THIỆU</h1>
        <div className='text-[24px] font-normal break-words'>safasg</div>
      </div>
      <div className='flex flex-col gap-5'>
        <h1 className='uppercase text-[44px] font-normal break-words tracking-[8px] text-[#26C6DA]'>
          ĐỊA ĐIỂM TỔ CHỨC
        </h1>
        <Flex>
          <Box className='relative h-full w-full'>
            <GoogleMap
              center={{ lat: center.latitude, lng: center.longitude }}
              zoom={15}
              mapContainerStyle={{ width: '60vw', height: '80vh', borderRadius: '6px', margin: '0 auto' }}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false
              }}
              onLoad={(map) => setMap(map)}
            >
              {markers.map((marker, index) => (
                <Marker key={index} position={{ lat: marker.position.latitude, lng: marker.position.longitude }} />
              ))}
            </GoogleMap>
          </Box>
        </Flex>
      </div>
    </div>
  )
}

export default EventDetailInfomation
