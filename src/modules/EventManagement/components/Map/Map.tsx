/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { GoogleMap, Marker, DirectionsRenderer, Autocomplete, useJsApiLoader } from '@react-google-maps/api'
import { UseFormRegister, UseFormHandleSubmit, UseFormSetValue, UseFormReset } from 'react-hook-form'
import { Input, Box, ButtonGroup, Flex } from '@chakra-ui/react'
import Button from 'src/modules/Share/components/Button'
import { LocationType, MarkerType } from '../../interfaces'
import { FormSearchMapType } from '../../utils'

interface Props {
  register: UseFormRegister<FormSearchMapType>
  handleSubmit: UseFormHandleSubmit<FormSearchMapType>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>
  reset: UseFormReset<FormSearchMapType>
  center: LocationType
  setCenter: React.Dispatch<React.SetStateAction<LocationType>>
  markers: MarkerType[]
  setMarkers: React.Dispatch<React.SetStateAction<MarkerType[]>>
}
const Map = ({ register, handleSubmit, setValue, center, setCenter, markers, setMarkers, reset }: Props) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  })

  const [_, setMap] = useState<google.maps.Map>()

  if (!isLoaded) {
    return null
  }

  const handleSearchAddress = handleSubmit((data) => {
    const address = data.address
    setMarkers([])
    if (address === '') {
      return
    }
    const geocoder = new google.maps.Geocoder()
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === 'OK' && results) {
        const location = results[0].geometry.location
        const locationCurrent = { latitude: location.lat(), longitude: location.lng() }
        const marker = { position: locationCurrent }
        setMarkers([marker])
        setCenter(locationCurrent)
        setValue('address.longitude', locationCurrent?.longitude.toString())
        setValue('address.latitude', locationCurrent?.latitude.toString())
        setValue('address.fullAddress', address)
      } else {
        console.error('Geocode was not successful for the following reason: ' + status)
      }
    })
  })

  const clearRoute = () => {
    setMarkers([])
    reset()
  }

  return (
    <Flex>
      <Box className='relative h-full w-full'>
        <GoogleMap
          center={{ lat: center.latitude, lng: center.longitude }}
          zoom={15}
          mapContainerStyle={{ width: '80vw', height: '80vh', borderRadius: '6px' }}
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
        <Box className='mt-2 bg-white/70 absolute top-0 left-[50%] translate-x-[-50%] rounded-lg outline-none p-4 w-[70%]'>
          <form onSubmit={handleSearchAddress} className='flex justify-between gap-6'>
            <Box className='flex-1'>
              <Autocomplete>
                <Input
                  type='text'
                  placeholder='Địa điểm'
                  {...register('address')}
                  className='z-[60] w-full border-[1px] border-gray-200 rounded-lg px-4 py-2 outline-none'
                />
              </Autocomplete>
            </Box>
            <ButtonGroup>
              <Button
                type='submit'
                classNameButton='bg-[#26C6DA] py-2 px-4 rounded-lg text-[14px] text-white font-semibold'
                onClick={handleSearchAddress}
              >
                Tìm kiếm
              </Button>
              <Button
                type='button'
                classNameButton='bg-[#26C6DA] py-2 px-4 rounded-lg text-[14px] text-white font-semibold'
                onClick={clearRoute}
              >
                Làm mới
              </Button>
            </ButtonGroup>
          </form>
        </Box>
      </Box>
    </Flex>
  )
}

export default Map
