import useRouteElements from './modules/Share/hooks/useRouteElements'

const App = () => {
  const RouteElements = useRouteElements()
  return <div>{RouteElements}</div>
}

export default App
