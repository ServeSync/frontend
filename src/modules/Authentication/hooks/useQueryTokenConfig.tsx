import { isUndefined, omitBy } from 'lodash'
import { ResetPasswordTokenConfig } from '../interfaces'
import { useQueryParams } from 'src/modules/Share/hooks'

export type QueryTokenConfig = {
  [key in keyof ResetPasswordTokenConfig]: string
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
