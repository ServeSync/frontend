import http from 'src/modules/Share/utils/http'
import { ActivityType, EventCategoryType } from '../../interfaces'
const eventCategoryAPI = {
  getListEventCategories: () => http.get<EventCategoryType[]>('/event-categories'),

  getListActivitiesByCategoryId: (categoryId: string) => {
    return http.get<ActivityType[]>(`/event-categories/${categoryId}/activities`)
  }
}

export default eventCategoryAPI
