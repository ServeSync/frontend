/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import facultyAPI from './faculty.api'
import { FacultyType } from '../../interfaces'

class GetAllFacultiesQuery {
  private _query

  constructor() {
    this._query = useQuery({
      queryKey: ['faculties'],
      queryFn: () => facultyAPI.getListFaculties(),
      staleTime: 3 * 60 * 1000
    })
  }

  fetch() {
    return this._query.data?.data as FacultyType[]
  }
}

export { GetAllFacultiesQuery }
