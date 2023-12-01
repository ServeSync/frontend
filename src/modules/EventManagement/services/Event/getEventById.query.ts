/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import eventAPI from './event.api'
import { handleError } from 'src/modules/Share/utils'
import { EventDetailType } from '../../interfaces'

class GetEventByIdQuery {
  private _query

  constructor(id: string) {
    this._query = useQuery({
      queryKey: ['event', id],
      queryFn: () => eventAPI.getEventById(id),
      enabled: id !== undefined && id !== '',
      onError: (error: any) => {
        handleError(error)
      }
    })
  }

  fetch() {
    return this._query.data?.data as EventDetailType
  }
}
export { GetEventByIdQuery }
