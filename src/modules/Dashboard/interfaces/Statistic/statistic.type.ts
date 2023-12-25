export interface StudentsStatisticType {
  name: string
  value: number
}

export interface StatisticType {
  status: string
  count: number
}

export interface ListStatisticsType {
  total: number
  data: StatisticType[]
}

export interface TotalStatisticsType {
  totalEvents: number
  totalStudents: number
  totalOrganizations: number
  totalProof: number
}
