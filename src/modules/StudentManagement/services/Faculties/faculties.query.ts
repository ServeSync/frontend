/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import { FacultyType } from '../../interfaces/faculty.type'
import facultyAPI from './faculty.api'

class GetAllFacultyQuery {
  private query

  constructor() {
    this.query = useQuery({
      queryKey: ['faculties'],
      queryFn: () => facultyAPI.getListFaculties()
    })
  }

  fetch() {
    return this.query.data?.data as FacultyType[]
  }

  getQuery() {
    return this.query
  }
}

export { GetAllFacultyQuery }
