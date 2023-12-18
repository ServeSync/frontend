/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import collaborationRequestAPI from './collaboration_request.api'
import { handleError } from 'src/modules/Share/utils'
import path from 'src/modules/Share/constants/path'
import { CollaborationRequestType } from '../../interfaces'

class GetCollaborationRequestByIdQuery {
  private _query
  private _navigate

  constructor(id: string) {
    this._navigate = useNavigate()
    this._query = useQuery({
      queryKey: ['pending_event', id],
      queryFn: () => collaborationRequestAPI.getRequestEvent(id),
      enabled: id !== undefined,
      staleTime: 3 * 60 * 1000,
      onError: (error: any) => {
        handleError(error)
        this._navigate(path.collaboration_request)
      }
    })
  }

  fetch() {
    return this._query.data?.data as CollaborationRequestType
  }

  isLoading() {
    return this._query.isLoading
  }
}

export { GetCollaborationRequestByIdQuery }
