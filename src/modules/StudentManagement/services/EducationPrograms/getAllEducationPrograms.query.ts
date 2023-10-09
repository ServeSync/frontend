/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import educationProgramAPI from './educationProgram.api'
import { EducationProgramType } from '../../interfaces'

class GetAllEducationProgramsQuery {
  private _query

  constructor() {
    this._query = useQuery({
      queryKey: ['education_programs'],
      queryFn: () => educationProgramAPI.getListEducationPrograms()
    })
  }

  fetch() {
    return this._query.data?.data as EducationProgramType[]
  }
}

export { GetAllEducationProgramsQuery }
