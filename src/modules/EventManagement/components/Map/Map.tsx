import { GoogleMap, Marker, DirectionsRenderer, Autocomplete, LoadScript } from '@react-google-maps/api'
import { Fragment, useRef, useState, useEffect } from 'react'
import { LocationType, MarkerType } from '../../interfaces'
import { Box, Button, ButtonGroup, Input } from '@mui/material'

function Map() {
  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
  //   libraries: ['places']
  // })

  const [center, setCenter] = useState<LocationType>({
    latitude: 16.074160300547344,
    longitude: 108.15078258893459
  })

  const [map, setMap] = useState<google.maps.Map>()
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [locationInfo, setLocationInfo] = useState<LocationType | null>({ latitude: 0, longitude: 0 })
  const [markers, setMarkers] = useState<MarkerType[]>([])

  const originRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (map) {
      const bounds = new window.google.maps.LatLngBounds({
        lat: center.latitude,
        lng: center.longitude
      })
      map.fitBounds(bounds)
    }
  }, [center, map])

  async function Search() {
    if (originRef.current?.value === '') {
      return
    }
    const geocoder = new window.google.maps.Geocoder()
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
    // originRef.current?.value = ''
    setLocationInfo(null)
    setMarkers([])
  }

  return (
    <Fragment>
      <Box>
        <LoadScript googleMapsApiKey={import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY} libraries={['places']}>
          <GoogleMap
            center={{ lat: center.latitude, lng: center.longitude }}
            zoom={10}
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
        </LoadScript>
      </Box>
      <Box>
        <Box flexGrow={1}>
          <Autocomplete>
            <Input type='text' placeholder='Origin' ref={originRef} />
          </Autocomplete>
        </Box>
        <ButtonGroup>
          <Button type='submit' onClick={Search}>
            Search
          </Button>
          <Button type='button' onClick={clearRoute}>
            Clear
          </Button>
        </ButtonGroup>
        <Input value={locationInfo ? locationInfo.longitude : ''} />
        <Input value={locationInfo ? locationInfo.latitude : ''} />
      </Box>
    </Fragment>
  )
}

export default Map
