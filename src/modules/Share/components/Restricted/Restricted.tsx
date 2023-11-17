import { Fragment } from 'react'
import { Permission } from '../../interfaces'
import usePermission from '../../hooks/usePermission'

interface RestrictedRouteProps {
  to: Permission
  fallback?: JSX.Element
  loadingComponent?: JSX.Element
  children: React.ReactNode
}

const Restricted = ({ to, fallback, loadingComponent, children }: RestrictedRouteProps) => {
  const [loading, allowed] = usePermission(to)

  if (loading) {
    return <Fragment>{loadingComponent}</Fragment>
  }

  if (allowed) {
    return <Fragment>{children}</Fragment>
  }

  return <Fragment>{fallback}</Fragment>
}

export default Restricted
