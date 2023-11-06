import http from 'src/modules/Share/utils/http'
import { ActivitiesListConfig, ActivityType, EventCategoriesListConfig, EventCategoryType } from '../../interfaces'

const eventCategoryAPI = {
  getListEventCategories: (params?: EventCategoriesListConfig) =>
    http.get<EventCategoryType[]>('/event-categories', { params }),

  getListActivitiesByCategoryId: (body: { categoryId: string; activitiesSearch?: ActivitiesListConfig }) => {
    return http.get<ActivityType[]>(`/event-categories/${body.categoryId}/activities`, {
      params: body.activitiesSearch
    })
  }
}

export default eventCategoryAPI
