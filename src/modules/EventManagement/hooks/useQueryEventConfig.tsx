import { useQueryParams } from 'src/modules/Share/hooks'
import { EventsListConfig } from '../interfaces'
import { isUndefined, omitBy } from 'lodash'

export type QueryEventConfig = {
  [key in keyof EventsListConfig]: string
}

const useQueryEventConfig = () => {
  const queryEventParams: QueryEventConfig = useQueryParams()
  const queryStudentConfig: QueryEventConfig = omitBy(
    {
      startDate: queryEventParams.startDate,
      endDate: queryEventParams.endDate,
      eventType: queryEventParams.eventType,
      eventStatus: queryEventParams.eventStatus,
      search: queryEventParams.search,
      sorting: queryEventParams.sorting,
      page: queryEventParams.page || 1,
      size: queryEventParams.size || 10,
      id: queryEventParams.id
    },
    isUndefined
  )
  return queryStudentConfig
}

export default useQueryEventConfig
