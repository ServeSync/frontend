/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import userAPI from './user.api'
import { RoleOfTenant } from '../../interfaces'

class GetListRolesOfTenantQuery {
  private _query

  constructor(id: string, tenantId: string) {
    this._query = useQuery({
      queryKey: ['roles_of_tenant', id, tenantId],
      queryFn: () => userAPI.getRolesOfTenant({ id, tenantId }),
      enabled: id !== undefined && tenantId !== undefined,
      staleTime: 3 * 60 * 1000
    })
  }

  fetch() {
    return this._query.data?.data as RoleOfTenant[]
  }
}

export { GetListRolesOfTenantQuery }
