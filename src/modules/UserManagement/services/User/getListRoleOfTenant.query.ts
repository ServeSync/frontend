/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import userAPI from './user.api'
import { ListRoleOfTenant } from '../../interfaces/RoleOfTenant'

class GetListRoleOfTenantQuery {
  private _query

  constructor(id: string, tenantId: string) {
    this._query = useQuery({
      queryKey: ['rolesOfTenant', id, tenantId],
      queryFn: () => userAPI.getRolesOfTenant({ id, tenantId }),
      enabled: id !== undefined && tenantId !== undefined,
      staleTime: 3 * 60 * 1000
    })
  }

  fetch() {
    return this._query.data?.data as ListRoleOfTenant
  }
}

export { GetListRoleOfTenantQuery }
