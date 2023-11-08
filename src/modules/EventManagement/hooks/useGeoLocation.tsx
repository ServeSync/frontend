import { useState, useEffect } from 'react'

const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    error: 0,
    coordinates: { lat: 0, lng: 0 }
  })

  const onSuccess = (location: GeolocationPosition) => {
    setLocation({
      loaded: true,
      error: 0,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude
      }
    })
  }

  const onError = (error: GeolocationPositionError) => {
    setLocation({
      loaded: true,
      error: error.code,
      coordinates: {
        lat: 0,
        lng: 0
      }
    })
  }

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log('error')
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError)
  }, [])

  return location
}

export default useGeoLocation
