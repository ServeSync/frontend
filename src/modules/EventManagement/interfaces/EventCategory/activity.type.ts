export interface ActivitiesListType {
  total: number
  totalPages: number
  data: ActivityType[]
}

export interface ActivityType {
  minScore: number
  maxScore: number
  eventCategoryId: string
  id: string
  name: string
}

export interface ActivitiesListConfig {
  search?: string
}
