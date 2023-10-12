/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import useQueryStudentConfig from '../../hooks/useQueryStudentConfig'
import studentAPI from './student.api'
import { StudentsListConfig, StudentsListType } from '../../interfaces'

class GetAllStudentsQuery {
  private _query
  private _queryStudentConfig

  constructor() {
    this._queryStudentConfig = useQueryStudentConfig()
    this._query = useQuery({
      queryKey: ['students', this._queryStudentConfig],
      queryFn: () => studentAPI.getListStudents(this._queryStudentConfig as StudentsListConfig),
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000
    })
  }

  fetch() {
    return this._query.data?.data as StudentsListType
  }

  getTotalPages() {
    return this._query.data?.data.totalPages as number
  }

  isLoading() {
    return this._query.isLoading
  }
}

export { GetAllStudentsQuery }
