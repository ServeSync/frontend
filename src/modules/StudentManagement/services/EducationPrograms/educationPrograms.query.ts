/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import { EducationProgramType } from '../../interfaces/education_program.type'
import educationProgramAPI from './educationProgram.api'

class GetAllEducationProgramQuery {
  private query

  constructor() {
    this.query = useQuery({
      queryKey: ['education_programs'],
      queryFn: () => educationProgramAPI.getListEducationPrograms()
    })
  }

  fetch() {
    return this.query.data?.data as EducationProgramType[]
  }

  getQuery() {
    return this.query
  }
}

export { GetAllEducationProgramQuery }
