/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */

import { useQuery } from '@tanstack/react-query'
import eventAPI from './event.api'
import { handleError } from 'src/modules/Share/utils'
import { RegisteredStudentsListType } from '../../interfaces'
class GetRegisteredStudentsQuery {
  private _query

  constructor(id: string, page: number, status?: string) {
    this._query = useQuery({
      queryKey: status ? ['registered_students', id, page, status] : ['registered_students', id, page],
      queryFn: () => eventAPI.getRegisteredStudents(id, page, status),
      enabled: id !== undefined,
      keepPreviousData: true,
      staleTime: 3 * 60 * 1000,
      onError: (error: any) => {
        handleError(error)
      }
    })
  }
  fetchDataWithStatus(id: string, page: number, status: string) {
    this._query.refetch({ queryKey: ['registered_students', id, page, status] })
  }

  fetch() {
    return this._query.data?.data as RegisteredStudentsListType
  }
}
export { GetRegisteredStudentsQuery }
