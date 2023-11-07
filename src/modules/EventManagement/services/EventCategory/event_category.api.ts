import http from 'src/modules/Share/utils/http'
import { ActivityType, EventCategoryConfig, EventCategoryType } from '../../interfaces'
const eventCategoryAPI = {
  getListEventCategories: (param?: EventCategoryConfig) =>
    http.get<EventCategoryType[]>('/event-categories', { params: param }),

  getListActivitiesByCategoryId: (categoryId: string) => {
    return http.get<ActivityType[]>(`/event-categories/${categoryId}/activities`)
  }
}

export default eventCategoryAPI
