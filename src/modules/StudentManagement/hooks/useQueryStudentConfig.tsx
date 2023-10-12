import { useQueryParams } from 'src/modules/Share/hooks/useQueryParam'
import { isUndefined, omitBy } from 'lodash'
import { StudentsListConfig } from '../interfaces'

export type QueryStudentConfig = {
  [key in keyof StudentsListConfig]: string
}

const useQueryStudentConfig = () => {
  const queryStudentParams: QueryStudentConfig = useQueryParams()
  const queryStudentConfig: QueryStudentConfig = omitBy(
    {
      homeRoomId: queryStudentParams.homeRoomId,
      facultyId: queryStudentParams.facultyId,
      educationProgramId: queryStudentParams.educationProgramId,
      gender: queryStudentParams.gender,
      search: queryStudentParams.search,
      sorting: queryStudentParams.sorting,
      page: queryStudentParams.page || 1,
      size: queryStudentParams.size || 10,
      id: queryStudentParams.id
    },
    isUndefined
  )
  return queryStudentConfig
}

export default useQueryStudentConfig
