/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import educationProgramAPI from './educationProgram.api'
import { StudentEducationProgramResultType } from '../../interfaces'

class GetStudentEducationProgramsQuery {
  private _query

  constructor(id: string) {
    this._query = useQuery({
      queryKey: ['student_education_program', id],
      queryFn: () => educationProgramAPI.getStudentEducationProgramResult(id),
      enabled: id !== undefined,
      staleTime: 3 * 60 * 1000
    })
  }

  fetch() {
    return this._query.data?.data as StudentEducationProgramResultType
  }

  isLoading() {
    return this._query.isLoading
  }
}

export { GetStudentEducationProgramsQuery }
