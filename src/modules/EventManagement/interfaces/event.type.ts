export interface EventsListType {
  total: number
  totalPages: number
  data: []
}

export interface EventType {}

export interface EventsListConfig {
  id?: string
  search?: string
  sorting?: string
  page?: number
  size?: number
}
