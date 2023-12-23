export interface StatisticType {
  name: string
  value: number
}

export interface EventStatisticType {
  status: string
  count: number
}

export interface ListEventsStatisticType {
  total: number
  data: EventStatisticType[]
}
