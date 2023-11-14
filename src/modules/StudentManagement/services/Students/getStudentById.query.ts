/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import studentAPI from './student.api'
import { handleError } from 'src/modules/Share/utils'
import { useNavigate } from 'react-router-dom'
import path from 'src/modules/Share/constants/path'
import { StudentType } from '../../interfaces'

class GetStudentByIdQuery {
  private _query
  private _navigate

  constructor(id: string) {
    this._navigate = useNavigate()
    this._query = useQuery({
      queryKey: ['student', id],
      queryFn: () => studentAPI.getStudent(id),
      enabled: id !== undefined,
      staleTime: 3 * 60 * 1000,
      onError: (error: any) => {
        handleError(error)
        this._navigate(path.student)
      }
    })
  }

  fetch() {
    return this._query.data?.data as StudentType
  }

  getEducationIdByStudentId() {
    return this._query.data?.data.educationProgramId
  }

  isLoading() {
    return this._query.isLoading
  }
}

export { GetStudentByIdQuery }
