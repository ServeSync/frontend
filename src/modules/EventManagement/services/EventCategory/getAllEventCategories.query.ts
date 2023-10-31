/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import eventCategoryAPI from './event_category.api'
import { EventCategoriesListType, EventCategoriesListConfig } from '../../interfaces'

class GetAllEventCategoriesQuery {
  private _query

  constructor(eventCategoriesSearch?: EventCategoriesListConfig) {
    this._query = useQuery({
      queryKey: ['event_categories', eventCategoriesSearch],
      queryFn: () => eventCategoryAPI.getListEventCategories(eventCategoriesSearch),
      keepPreviousData: true,
      staleTime: 3 * 60 * 1000
    })
  }

  fetch() {
    return this._query.data?.data as EventCategoriesListType
  }
}

export { GetAllEventCategoriesQuery }
