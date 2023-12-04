/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import { EventActivityType } from '../../interfaces'
import eventActivityAPI from './event_activity.api'

class GetAllEventActivitiesQuery {
  private _query

  constructor(type?: string) {
    this._query = useQuery({
      queryKey: ['event_activities'],
      queryFn: () => eventActivityAPI.getListEventActivities({ Type: type }),
      keepPreviousData: true
    })
  }

  fetch() {
    return this._query.data?.data as EventActivityType[]
  }
}

export { GetAllEventActivitiesQuery }
