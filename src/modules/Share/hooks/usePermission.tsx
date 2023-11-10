import { useContext, useEffect, useState } from 'react'
import { Permission } from '../interfaces'
import { PermissionContext } from '../contexts'

const usePermission = (permission: Permission) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [allowed, setAllowed] = useState<boolean>()

  const { isAllowedTo } = useContext(PermissionContext)

  useEffect(() => {
    try {
      setAllowed(isAllowedTo(permission))
    } finally {
      setLoading(false)
    }
  }, [isAllowedTo, permission])

  return [loading, allowed]
}

export default usePermission
