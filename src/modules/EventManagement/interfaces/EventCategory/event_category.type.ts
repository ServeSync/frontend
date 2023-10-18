export interface EventCategoriesListType {
  total: number
  totalPages: number
  data: EventCategoryType[]
}

export interface EventCategoryType {
  id: string
  name: string
}
