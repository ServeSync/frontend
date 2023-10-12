import { isUndefined, omitBy } from 'lodash'
import { useQueryParams } from 'src/modules/Share/hooks'
import { RoleConfig } from '../interfaces'

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
