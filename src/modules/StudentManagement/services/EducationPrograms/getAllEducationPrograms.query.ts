/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import educationProgramAPI from './educationProgram.api'
import { EducationProgramType } from '../../interfaces'

class GetAllEducationProgramsQuery {
  private _query

  constructor() {
    this._query = useQuery({
      queryKey: ['education_programs'],
      queryFn: () => educationProgramAPI.getListEducationPrograms(),
      staleTime: 3 * 60 * 1000
    })
  }

  fetch() {
    return this._query.data?.data as EducationProgramType[]
  }
}

export { GetAllEducationProgramsQuery }
