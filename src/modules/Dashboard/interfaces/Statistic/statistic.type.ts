export interface StudentsStatisticType {
  name: string
  value: number
}

export interface StatisticType {
  status: string
  count: number
}

export interface ListStatisticType {
  total: number
  data: StatisticType[]
}
