import { useQueryParams } from 'src/modules/Share/hooks'
import { isUndefined, omitBy } from 'lodash'
import { EventAttendanceConfig } from '../interfaces'

export type QueryEventQRConfig = {
  [key in keyof EventAttendanceConfig]: string
}

const useQueryEventQRConfig = () => {
  const queryEventAttendanceParams: EventAttendanceConfig = useQueryParams()
  const queryEventAttendanceConfig: EventAttendanceConfig = omitBy(
    {
      Code: queryEventAttendanceParams.Code,
      EventId: queryEventAttendanceParams.EventId
    },
    isUndefined
  )
  return queryEventAttendanceConfig
}

export default useQueryEventQRConfig
