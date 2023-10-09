/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import useQueryStudentConfig from '../../hooks/useQueryStudentConfig'
import studentAPI from './student.api'
import { StudentType } from '../../interfaces/student.type'
import { handleError } from 'src/modules/Share/utils'
import { useNavigate } from 'react-router-dom'
import path from 'src/modules/Share/constants/path'

class GetStudentQuery {
  private query
  private navigate
  private queryStudentConfig

  constructor(param?: string) {
    this.queryStudentConfig = useQueryStudentConfig()
    this.navigate = useNavigate()
    this.query = useQuery({
      queryKey: ['student', this.queryStudentConfig],
      queryFn: () => studentAPI.getStudent(this.queryStudentConfig.id as string),
      enabled: this.queryStudentConfig.id !== undefined && param === 'students',
      onError: (error: any) => {
        handleError(error)
        this.navigate(path.student)
      }
    })
  }

  fetch() {
    return this.query.data?.data as StudentType
  }

  getQuery() {
    return this.query
  }

  getEducationIdByStudentId() {
    return this.query.data?.data.educationProgramId
  }

  isLoading() {
    return this.query.isLoading
  }
}

export { GetStudentQuery }
