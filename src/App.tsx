import { useContext, useEffect } from 'react'
import { AppContext } from './modules/Share/contexts'
import { LocalStorageEventTarget } from './modules/Authentication/utils'
import useRouteElements from './modules/Share/hooks/useRouteElements'

const App = () => {
  const RouteElements = useRouteElements()

  const { reset } = useContext(AppContext)

  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearToken', reset)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearToken', reset)
    }
  })

  return <div>{RouteElements}</div>
}

export default App
