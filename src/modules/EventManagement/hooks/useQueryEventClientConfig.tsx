import { useQueryParams } from 'src/modules/Share/hooks'
import { isUndefined, omitBy } from 'lodash'
import { QueryEventConfig } from '.'

const useQueryEventClientConfig = () => {
  const queryEventParams: QueryEventConfig = useQueryParams()
  const queryEventConfig: QueryEventConfig = omitBy(
    {
      startDate: queryEventParams.startDate,
      endDate: queryEventParams.endDate,
      eventType: queryEventParams.eventType,
      eventStatus: queryEventParams.eventStatus,
      search: queryEventParams.search,
      sorting: queryEventParams.sorting,
      page: queryEventParams.page || 1,
      size: queryEventParams.size || 9,
      defaultFilters: queryEventParams.defaultFilters || 'Personalized',
      id: queryEventParams.id
    },
    isUndefined
  )
  return queryEventConfig
}

export default useQueryEventClientConfig
