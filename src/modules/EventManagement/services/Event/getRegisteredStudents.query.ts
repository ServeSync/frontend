/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */

import { useQuery } from '@tanstack/react-query'
import eventAPI from './event.api'
import { handleError } from 'src/modules/Share/utils'
import { RegisteredStudentsListType } from '../../interfaces'
class GetRegisteredStudentsQuery {
  private _query

  constructor(id: string, page: number) {
    this._query = useQuery({
      queryKey: ['registered_students', id, page],
      queryFn: () => eventAPI.getRegisteredStudents(id, page),
      enabled: id !== undefined,
      staleTime: 3 * 60 * 1000,
      onError: (error: any) => {
        handleError(error)
      }
    })
  }
  fetch() {
    return this._query.data?.data as RegisteredStudentsListType
  }
}
export { GetRegisteredStudentsQuery }
