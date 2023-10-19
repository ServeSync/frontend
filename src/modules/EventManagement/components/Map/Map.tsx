import { GoogleMap, Marker, DirectionsRenderer, Autocomplete, useJsApiLoader } from '@react-google-maps/api'
import { useRef, useState } from 'react'
import { LocationType, MarkerType } from '../../interfaces'
import { Box, Button, ButtonGroup, Flex, HStack, Input, Text } from '@chakra-ui/react'
function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyColNaHzn6oI0OdZof5ueDxhifV_rrs8Iw',
    libraries: ['places']
  })

  const [center, setCenter] = useState<LocationType>({
    latitude: 16.074160300547344,
    longitude: 108.15078258893459
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [map, setMap] = useState<google.maps.Map>()
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [locationInfo, setLocationInfo] = useState<LocationType | null>({ latitude: 0, longitude: 0 })
  const [markers, setMarkers] = useState<MarkerType[]>([])

  const originRef = useRef<HTMLInputElement>(null)

  const Search = async () => {
    if (originRef.current?.value === '') {
      return
    }

    const geocoder = new google.maps.Geocoder()
    geocoder.geocode({ address: originRef.current?.value }, (results, status) => {
      if (status === 'OK' && results) {
        const location = results[0].geometry.location
        const locationCurrent = { latitude: location.lat(), longitude: location.lng() }
        setLocationInfo(locationCurrent)
        const marker = { position: locationCurrent }
        setMarkers([marker])
        setCenter(locationCurrent)
      } else {
        console.error('Geocode was not successful for the following reason: ' + status)
      }
    })
  }

  const clearRoute = () => {
    setDirectionsResponse(null)
    setLocationInfo(null)
    setMarkers([])
  }

  if (!isLoaded) {
    return null
  }

  return (
    <Flex position='relative' flexDirection='column' alignItems='center' h='100vh' w='full'>
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
        <GoogleMap
          center={{ lat: center.latitude, lng: center.longitude }}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
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
      </Box>
      <Box p={4} borderRadius='lg' m={2} bgColor='white' shadow='base' minW='container.md' zIndex='1'>
        <HStack spacing={2} justifyContent='space-between'>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input type='text' placeholder='Origin' ref={originRef} />
            </Autocomplete>
          </Box>
          <ButtonGroup>
            <Button colorScheme='blue' type='submit' onClick={Search}>
              Search
            </Button>
            <Button colorScheme='red' type='button' onClick={clearRoute}>
              Clear
            </Button>
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent='space-between'>
          <Text>Longitude:</Text>
          <Input value={locationInfo ? locationInfo.longitude : ''} />
          <Text>Latitude:</Text>
          <Input value={locationInfo ? locationInfo.latitude : ''} />
        </HStack>
      </Box>
    </Flex>
  )
}

export default Map
