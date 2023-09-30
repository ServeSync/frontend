import { ResetTokenConfig } from 'src/modules/Authentication/interfaces/auth.type'
import { useQueryParams } from 'src/modules/Share/hooks/useQueryParam'
import { isUndefined, omitBy } from 'lodash'

export type QueryTokenConfig = {
  [key in keyof ResetTokenConfig]: string
}

const useQueryTokenConfig = () => {
  const queryTokenParams: QueryTokenConfig = useQueryParams()
  const queryTokenConfig: QueryTokenConfig = omitBy(
    {
      token: queryTokenParams.token
    },
    isUndefined
  )
  return queryTokenConfig
}
export default useQueryTokenConfig
