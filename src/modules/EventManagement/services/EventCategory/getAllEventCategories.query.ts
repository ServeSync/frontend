/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import eventCategoryAPI from './event_category.api'
import { EventCategoriesListType } from '../../interfaces'

class GetAllEventCategoriesQuery {
  private _query

  constructor() {
    this._query = useQuery({
      queryKey: ['event_categories'],
      queryFn: () => eventCategoryAPI.getListEventCategories(),
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000
    })
  }

  fetch() {
    return this._query.data?.data as EventCategoriesListType
  }
}

export { GetAllEventCategoriesQuery }
