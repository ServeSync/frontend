/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import { GoogleMap, Marker, DirectionsRenderer, Autocomplete, useJsApiLoader } from '@react-google-maps/api'
import { UseFormRegister, UseFormHandleSubmit, UseFormSetValue, UseFormReset } from 'react-hook-form'
import { Input, Box, ButtonGroup, Flex } from '@chakra-ui/react'
import Button from 'src/modules/Share/components/Button'
import { LocationType, MarkerType } from '../../interfaces'
import { FormEventType, FormSearchMapType } from '../../utils'

interface Props {
  register: UseFormRegister<FormSearchMapType>
  handleSubmit: UseFormHandleSubmit<FormSearchMapType>
  setValue: UseFormSetValue<FormEventType>
  reset: UseFormReset<FormSearchMapType>
  center: LocationType
  setCenter: React.Dispatch<React.SetStateAction<LocationType>>
  markers: MarkerType[]
  setMarkers: React.Dispatch<React.SetStateAction<MarkerType[]>>
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}
const Map = ({
  register,
  handleSubmit,
  setValue,
  center,
  setCenter,
  markers,
  setMarkers,
  reset,
  setIsOpenModal
}: Props) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  })

  useEffect(() => {
    setMarkers([...markers, { position: center }])
  }, [center, markers, setMarkers])

  const [_, setMap] = useState<google.maps.Map>()
  const [directionsResponse] = useState(null)
  const [address, setAddress] = useState<string>('')
  const [locationCurrent, setLocationCurrent] = useState<{ latitude: number; longitude: number }>(center)

  if (!isLoaded) {
    return null
  }

  const handleSearchAddress = handleSubmit((data) => {
    if (data.address === '') {
      return
    }
    setAddress(data.address)
    const geocoder = new google.maps.Geocoder()
    geocoder.geocode({ address: data.address }, (results, status) => {
      if (status === 'OK' && results) {
        const location = results[0].geometry.location
        const marker = { position: { latitude: location.lat(), longitude: location.lng() } }
        setMarkers([...markers, marker])
        setLocationCurrent({ latitude: location.lat(), longitude: location.lng() })
        setCenter({ latitude: location.lat(), longitude: location.lng() })
      } else {
        console.error('Geocode was not successful for the following reason: ' + status)
      }
    })
  })

  const handleEnterAddress = () => {
    setValue('address.longitude', locationCurrent?.longitude.toString())
    setValue('address.latitude', locationCurrent?.latitude.toString())
    setValue('address.fullAddress', address)
    setIsOpenModal(false)
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
          {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        </GoogleMap>
        <Box className='mt-2 bg-white/70 absolute top-0 left-[50%] translate-x-[-50%] rounded-lg outline-none p-4 w-[70%]'>
          <form className='flex justify-between gap-6'>
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
                type='button'
                classNameButton='bg-[#26C6DA] py-2 px-4 rounded-lg text-[14px] text-white font-semibold hover:bg-[#60d9e9]'
                onClick={handleSearchAddress}
              >
                Tìm kiếm
              </Button>
              <Button
                type='button'
                classNameButton='bg-[#26C6DA] py-2 px-4 rounded-lg text-[14px] text-white font-semibold hover:bg-[#60d9e9] disabled:bg-slate-300 disabled:cursor-not-allowed'
                onClick={handleEnterAddress}
                disabled={address === ''}
              >
                Chọn
              </Button>
            </ButtonGroup>
          </form>
        </Box>
      </Box>
    </Flex>
  )
}

export default Map
