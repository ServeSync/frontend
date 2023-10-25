import http from 'src/modules/Share/utils/http'
import {
  ActivitiesListConfig,
  ActivitiesListType,
  EventCategoriesListConfig,
  EventCategoriesListType
} from '../../interfaces'

const eventCategoryAPI = {
  getListEventCategories: (params?: EventCategoriesListConfig) =>
    http.get<EventCategoriesListType>('/event-categories', { params }),

  getListActivitiesByCategoryId: (body: { categoryId: string; activitiesSearch?: ActivitiesListConfig }) => {
    return http.get<ActivitiesListType>(`/event-categories/${body.categoryId}/activities`, {
      params: body.activitiesSearch
    })
  }
}

export default eventCategoryAPI
