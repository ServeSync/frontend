import { useQueryParams } from 'src/modules/Share/hooks'
import { isUndefined, omitBy } from 'lodash'
import { RequestEventsListConfig } from '../interfaces'

export type QueryRequestEventConfig = {
  [key in keyof RequestEventsListConfig]: string
}

const useQueryRequestEventConfig = () => {
  const queryRequestEventParams: QueryRequestEventConfig = useQueryParams()
  const queryRequestEventConfig: QueryRequestEventConfig = omitBy(
    {
      startDate: queryRequestEventParams.startDate,
      endDate: queryRequestEventParams.endDate,
      status: queryRequestEventParams.status,
      type: queryRequestEventParams.type,
      search: queryRequestEventParams.search,
      sorting: queryRequestEventParams.sorting,
      page: queryRequestEventParams.page || 1,
      size: queryRequestEventParams.size || 10,
      id: queryRequestEventParams.id
    },
    isUndefined
  )
  return queryRequestEventConfig
}

export default useQueryRequestEventConfig
