/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import eventOrganizationAPI from './event_organization.api'
import { handleError } from 'src/modules/Share/utils'
import path from 'src/modules/Share/constants/path'
import { EventOrganizationType } from '../../interfaces'

class GetEventOrganizationByIdQuery {
  private _query
  private _navigate

  constructor(id: string) {
    this._navigate = useNavigate()
    this._query = useQuery({
      queryKey: ['event_organization', id],
      queryFn: () => eventOrganizationAPI.getEventOrganizationById(id),
      enabled: id !== undefined,
      staleTime: 3 * 60 * 1000,
      onError: (error: any) => {
        handleError(error)
        this._navigate(path.event_organization)
      }
    })
  }

  fetch() {
    return this._query.data?.data as EventOrganizationType
  }
}

export { GetEventOrganizationByIdQuery }
