import { useState, useEffect } from 'react'

const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: 0, lng: 0 }
  })

  const onSuccess = (location: GeolocationPosition) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude
      }
    })
  }

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log('error')
    }
    navigator.geolocation.getCurrentPosition(onSuccess)
  }, [])

  return location
}

export default useGeoLocation
