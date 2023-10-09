import { useQueryParams } from '../../Share/hooks/useQueryParam'
import omitBy from 'lodash/omitBy'
import { isUndefined } from 'lodash'
import { RoleConfig } from '../interfaces/role.type'

export type QueryRoleConfig = {
  [key in keyof RoleConfig]: string
}

const useQueryRoleConfig = () => {
  const queryRoleParams: QueryRoleConfig = useQueryParams()
  const queryRoleConfig: QueryRoleConfig = omitBy(
    {
      id: queryRoleParams.id
    },
    isUndefined
  )
  return queryRoleConfig
}

export default useQueryRoleConfig
