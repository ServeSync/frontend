import { useQueryParams } from 'src/modules/Share/hooks/useQueryParam'
import { isUndefined, omitBy } from 'lodash'
import { StatisticListConfig } from '../interfaces'

export type QueryStatisticConfig = {
  [key in keyof StatisticListConfig]: string
}

const useQueryStatisticConfig = () => {
  const queryStatisticParams: QueryStatisticConfig = useQueryParams()
  const queryStatisticConfig: QueryStatisticConfig = omitBy(
    {
      Type: queryStatisticParams.Type
    },
    isUndefined
  )
  return queryStatisticConfig
}

export default useQueryStatisticConfig
