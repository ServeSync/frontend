import { useQueryParams } from 'src/modules/Share/hooks'
import { UsersListConfig } from '../interfaces/User'
import { isUndefined, omitBy } from 'lodash'

export type QueryUserConfig = {
  [key in keyof UsersListConfig]: string
}

const useQueryUserConfig = () => {
  const queryUserParams: QueryUserConfig = useQueryParams()
  const queryUserConfig: QueryUserConfig = omitBy(
    {
      search: queryUserParams.search,
      sorting: queryUserParams.sorting,
      page: queryUserParams.page || 1,
      size: queryUserParams.size || 10
    },
    isUndefined
  )
  return queryUserConfig
}

export default useQueryUserConfig
