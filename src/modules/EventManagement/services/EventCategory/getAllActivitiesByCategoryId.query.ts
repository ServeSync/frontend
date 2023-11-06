/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import eventCategoryAPI from './event_category.api'
import { ActivitiesListConfig, ActivityType } from '../../interfaces'

class GetAllActivitiesByCategoryIdQuery {
  private _query

  constructor(categoryId: string, activitiesSearch?: ActivitiesListConfig) {
    this._query = useQuery({
      queryKey: ['activities', categoryId, activitiesSearch],
      queryFn: () => eventCategoryAPI.getListActivitiesByCategoryId({ categoryId, activitiesSearch }),
      enabled: categoryId !== '',
      staleTime: 3 * 60 * 1000
    })
  }

  fetch() {
    return this._query.data?.data as ActivityType[]
  }
}

export { GetAllActivitiesByCategoryIdQuery }
