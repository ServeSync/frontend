/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import eventCategoryAPI from './event_category.api'
import { EventCategoryType } from '../../interfaces'

class GetAllEventCategoriesQuery {
  private _query

  constructor(type?: string) {
    this._query = useQuery({
      queryKey: ['event_categories'],
      queryFn: () => eventCategoryAPI.getListEventCategories({ Type: type }),
      keepPreviousData: true,
      staleTime: 3 * 60 * 1000
    })
  }

  fetch() {
    return this._query.data?.data as EventCategoryType[]
  }
}

export { GetAllEventCategoriesQuery }
