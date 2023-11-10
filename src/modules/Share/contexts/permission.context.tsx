import { createContext } from 'react'
import { Permission } from '../interfaces'

interface PermissionContextType {
  isAllowedTo: (permission: Permission) => boolean
}

const initialPermissionContext: PermissionContextType = {
  isAllowedTo: () => false
}

export const PermissionContext = createContext<PermissionContextType>(initialPermissionContext)

interface Props {
  fetchPermission: (permission: Permission) => boolean
  children: React.ReactNode
}

interface PermissionCache {
  [key: string]: boolean
}

export const PermissionProvider = ({ fetchPermission, children }: Props) => {
  const cache: PermissionCache = {}

  const isAllowedTo = (permission: Permission): boolean => {
    if (Object.keys(cache).includes(permission)) {
      return cache[permission]
    }

    const isAllowed = fetchPermission(permission)

    cache[permission] = isAllowed

    return isAllowed
  }

  return <PermissionContext.Provider value={{ isAllowedTo }}>{children}</PermissionContext.Provider>
}
