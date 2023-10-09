/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import useQueryStudentConfig from '../../hooks/useQueryStudentConfig'
import studentAPI from './student.api'
import { StudentListConfig, StudentsListType } from '../../interfaces/student.type'

class GetAllStudentQuery {
  private query
  private queryStudentConfig

  constructor() {
    this.queryStudentConfig = useQueryStudentConfig()
    this.query = useQuery({
      queryKey: ['students', this.queryStudentConfig],
      queryFn: () => studentAPI.getListStudents(this.queryStudentConfig as StudentListConfig),
      keepPreviousData: true,
      staleTime: 3 * 60 * 1000
    })
  }

  fetch() {
    return this.query.data?.data as StudentsListType
  }

  getTotalPages() {
    return this.query.data?.data.totalPages as number
  }

  getQuery() {
    return this.query
  }

  isLoading() {
    return this.query.isLoading
  }
}

export { GetAllStudentQuery }
