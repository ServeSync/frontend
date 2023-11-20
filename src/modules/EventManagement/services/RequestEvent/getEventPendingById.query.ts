/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import requestEventAPI from './request_event.api'
import { handleError } from 'src/modules/Share/utils'
import path from 'src/modules/Share/constants/path'
import { EventPendingType } from '../../interfaces'

class GetEventPendingByIdQuery {
  private _query
  private _navigate

  constructor(id: string) {
    this._navigate = useNavigate()
    this._query = useQuery({
      queryKey: ['pending_event', id],
      queryFn: () => requestEventAPI.getRequestEvent(id),
      enabled: id !== undefined,
      staleTime: 3 * 60 * 1000,
      onError: (error: any) => {
        handleError(error)
        this._navigate(path.event_pending)
      }
    })
  }

  fetch() {
    return this._query.data?.data as EventPendingType
  }

  isLoading() {
    return this._query.isLoading
  }
}

export { GetEventPendingByIdQuery }
