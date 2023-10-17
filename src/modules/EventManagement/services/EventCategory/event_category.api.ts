import http from 'src/modules/Share/utils/http'
import { ActivitiesListType, EventCategoriesListType } from '../../interfaces'

const eventCategoryAPI = {
  getListEventCategories: () => http.get<EventCategoriesListType>('/event-categories'),

  getListActivitiesByCategoryId: (id: string) => http.get<ActivitiesListType>(`/event-categories/${id}/activities`)
}

export default eventCategoryAPI
