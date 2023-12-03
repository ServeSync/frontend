import http from 'src/modules/Share/utils/http'
import { EventActivityType, EventCategoryConfig, EventCategoryType } from '../../interfaces'
const eventCategoryAPI = {
  getListEventCategories: (param?: EventCategoryConfig) =>
    http.get<EventCategoryType[]>('/event-categories', { params: param }),

  getListActivitiesByCategoryId: (categoryId: string) => {
    return http.get<EventActivityType[]>(`/event-categories/${categoryId}/activities`)
  }
}

export default eventCategoryAPI
