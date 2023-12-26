import { useQueryParams } from 'src/modules/Share/hooks'
import { EventsListConfig } from '../interfaces'
import { isUndefined, omitBy } from 'lodash'

export type QueryEventConfig = {
  [key in keyof EventsListConfig]: string
}

const useQueryEventConfig = () => {
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
      size: queryEventParams.size || 10,
      defaultFilters: queryEventParams.defaultFilters || 'Personalized',
      isPaging: queryEventParams.isPaging || true,
      id: queryEventParams.id
    },
    isUndefined
  )
  return queryEventConfig
}

export default useQueryEventConfig
